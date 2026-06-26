import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { RolesRepository, UsersRepository } from 'src/common/repositories';
import { ErrorCodes } from 'src/common/statusCodes';
// import { NodemailerService } from 'src/shared/services';
import { promisify } from 'util';
import { RegisterDto } from './dto/createUserDto';
import { RestorePasswordDto } from './dto/restorePasswordDto';
import { ChangePasswordDto } from './dto/changePasswordDto';
import { generateEmailMessage } from 'src/common/utils/emailMessages';
import { UpdateUserDto } from './dto/updateUserDto';
import { GetUsersDto } from './dto/getUserDto';
import {
  BadRequestAppException,
  ForbiddenAppException,
  NotFoundAppException,
} from 'src/common/exceptions';
import { MailService } from 'src/shared/services';

@Injectable()
export class UsersService {
  private frontendUrl: string;

  constructor(
    private configService: ConfigService,
    private usersRepository: UsersRepository,
    private readonly mailerService: MailService,
    private rolesRepository: RolesRepository,
  ) {
    this.frontendUrl = this.configService.get('data.frontendUrl');
  }

  generateRandomCode(length: number): string {
    const randomBytesCount = Math.ceil(length / 2);
    const randomBytesBuffer = randomBytes(randomBytesCount);
    const randomCode = randomBytesBuffer.toString('hex').slice(0, length);
    return randomCode;
  }

  async registerUser(body: RegisterDto, isSocial: boolean = false) {
    const { password } = body;
    const email = body.email.toLowerCase();

    const userExist = await this.usersRepository.findOne({
      where: { email },
    });

    if (userExist) {
      throw new BadRequestAppException(ErrorCodes.IsAlreadyExist);
    }

    const role = await this.rolesRepository.getRole('user');
    const verificationCode = this.generateRandomCode(4);

    const newUser = {
      ...body,
      email,
      token: '',
      active: false,
      emailVerified: isSocial,
      verificationCode,
      password: password
        ? await bcrypt.genSalt(10).then(salt => bcrypt.hash(password, salt))
        : null,
      role,
    };

    if (isSocial) {
      await this.mailerService.sendMail(
        [email],
        'Thanks for registration',
        generateEmailMessage('socialRegistration', {}),
      );
    } else {
      await this.mailerService.sendMail(
        [email],
        'Thanks for registration',
        generateEmailMessage('registration', { verificationCode }),
      );
    }

    const user = await this.usersRepository.save(newUser);

    return {
      ...user,
      roleId: role.id,
    };
  }

  async checkUser(email: string) {
    const mailAddress = email.toLowerCase();
    return await this.usersRepository.findOne({
      where: { email: mailAddress },
    });
  }

  async verifyUser(verificationCode: string, email: string) {
    const mailAddress = email.toLowerCase();
    const user = await this.usersRepository.findOne({
      where: { verificationCode, email: mailAddress },
    });
    if (!user) {
      throw new NotFoundAppException(ErrorCodes.UserNotFound);
    }

    const payload = {
      emailVerified: true,
      verificationCode: '',
    };
    await this.usersRepository.update(user.id, { ...payload });

    return user;
  }

  async validateVerificationCode(verificationCode: string, email: string) {
    const mailAddress = email.toLowerCase();
    const user = await this.usersRepository.findOne({
      where: { verificationCode, email: mailAddress },
    });
    if (!user) {
      throw new BadRequestAppException(ErrorCodes.VerificationCodeNotValid);
    }
  }

  async updateUserVerifyCode(email: string) {
    const mailAddress = email.toLowerCase();
    const user = await this.usersRepository.findOne({
      where: { email: mailAddress },
    });
    if (!user) {
      throw new NotFoundAppException(ErrorCodes.UserNotFound);
    }

    const verificationCode = this.generateRandomCode(4);
    await this.usersRepository.update(user.id, { verificationCode });

    return verificationCode;
  }

  async sendVerifyCode(email: string) {
    const mailAddress = email.toLowerCase();
    const verificationCode = await this.updateUserVerifyCode(mailAddress);

    return await this.mailerService.sendMail(
      [mailAddress],
      'Verify email',
      generateEmailMessage('verifyEmail', { verificationCode }),
    );
  }

  async sendResetLink(email: string) {
    const mailAddress = email.toLowerCase();
    const verificationCode = await this.updateUserVerifyCode(mailAddress);

    return await this.mailerService.sendMail(
      [mailAddress],
      'Reset password',
      generateEmailMessage('resetPassword', {
        frontendUrl: this.frontendUrl,
        email: encodeURIComponent(mailAddress),
        verificationCode: encodeURIComponent(verificationCode),
      }),
    );
  }

  async restorePassword(body: RestorePasswordDto) {
    const { password, verificationCode } = body;
    const email = body.email.toLowerCase();
    const userExist = await this.usersRepository.findOne({
      where: { email, verificationCode },
    });
    if (!userExist) {
      throw new NotFoundAppException(ErrorCodes.UserNotFound);
    }

    const newPassword = await bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt));
    await this.usersRepository.update(
      { email },
      { password: newPassword, verificationCode: '' },
    );
  }

  async getUserInfo(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundAppException(ErrorCodes.UserNotFound);
    }
    return user;
  }

  async changePassword(id: number, body: ChangePasswordDto) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundAppException(ErrorCodes.UserNotFound);
    }

    const result = await promisify(bcrypt.compare)(
      body.password,
      user.password,
    );
    if (!result) {
      throw new ForbiddenAppException(ErrorCodes.CredentialsNotValid);
    }

    const isSame = await bcrypt.compare(body.newPassword, user.password);
    if (isSame) {
      throw new BadRequestAppException(ErrorCodes.PasswordIsSameAsOld);
    }

    const newPassword = await bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(body.newPassword, salt));
    return await this.usersRepository.update(id, { password: newPassword });
  }

  async update(id: number, updateUserDTO: UpdateUserDto) {
    return this.usersRepository.update({ id }, updateUserDTO);
  }

  async getUsers(query: GetUsersDto) {
    return this.usersRepository.getUsersList({
      page: this.parsePositiveInteger(query.page, 1, 1),
      perPage: this.parsePositiveInteger(query.perPage, 20, 100),
      search: query.search?.trim(),
      emailVerified: this.parseBooleanFilter(query.emailVerified),
      active: this.parseBooleanFilter(query.active),
      blocked: this.parseBooleanFilter(query.blocked),
    });
  }

  async updateActivation(id: number, active: boolean) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundAppException(ErrorCodes.UserNotFound);
    }

    await this.usersRepository.update({ id }, { active });
    return this.usersRepository.getUserInfo(id);
  }

  async updateRole(id: number, roleName: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundAppException(ErrorCodes.UserNotFound);
    }

    const role = await this.rolesRepository.getRole(
      roleName.trim().toLowerCase(),
    );
    if (!role) {
      throw new NotFoundAppException(ErrorCodes.DataNotFound);
    }

    await this.usersRepository.update({ id }, { roleId: role.id });
    return this.usersRepository.getUserWithRole(user.email);
  }

  async blockUser(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundAppException(ErrorCodes.UserNotFound);
    }

    await this.usersRepository.update({ id }, { blocked: !user.blocked });
  }

  private parsePositiveInteger(
    value: string | undefined,
    fallback: number,
    max?: number,
  ) {
    const parsed = Number(value ?? fallback);
    const normalized =
      Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
    return max ? Math.min(normalized, max) : normalized;
  }

  private parseBooleanFilter(value?: string) {
    if (value === undefined) {
      return undefined;
    }
    return value === 'true';
  }
}
