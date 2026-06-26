import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Request,
  Get,
  Patch,
  Param,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import {
  SendVerifyCodeDto,
  VerifyCodeDto,
  VerifyUserDto,
} from './dto/verifyUserDto';
import { ChangePasswordDto } from './dto/changePasswordDto';
import { RestorePasswordDto } from './dto/restorePasswordDto';
import { UsersRepository } from 'src/common/repositories';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/createUserDto';
import {
  UpdateUserActivationDto,
  UpdateUserDto,
  UpdateUserRoleDto,
} from './dto/updateUserDto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { GetUsersDto } from './dto/getUserDto';
import { RolesGuard } from 'src/common/guards';
import { FileUploadInterceptor } from 'src/common/interseptors/file-upload.interceptor';
import { MulterFile } from 'src/r2/storage.service';

const UserAvatarInterceptor = FileUploadInterceptor('files', {
  maxFiles: 1,
  maxFileSize: 20 * 1024 * 1024,
  allowedTypes: ['image/jpeg', 'image/png'],
  allowedExtensions: ['jpg', 'jpeg', 'png'],
  useMemoryStorage: true,
});

@Controller('/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private usersRepository: UsersRepository,
  ) {}

  @Post('/register')
  @HttpCode(200)
  async register(@Body() body: RegisterDto) {
    const user = await this.usersService.registerUser(body);
    return {
      active: user.active,
      blocked: user.blocked,
      emailVerified: user.emailVerified,
      email: user.email,
    };
  }

  @Post('/verify')
  @HttpCode(200)
  async verify(@Body() body: VerifyUserDto) {
    const { verificationCode, email } = body;
    const data = await this.usersService.verifyUser(verificationCode, email);
    const user = await this.usersRepository.getUserInfo(data.id);
    return { user };
  }

  @Post('/validate-verify-code')
  @HttpCode(200)
  async validateCode(@Body() body: VerifyCodeDto) {
    const { verificationCode, email } = body;
    await this.usersService.validateVerificationCode(verificationCode, email);
    return {};
  }

  @Post('/send-verify-code')
  @HttpCode(200)
  async sendVerifyCode(@Body() body: SendVerifyCodeDto) {
    const { email } = body;
    await this.usersService.sendVerifyCode(email);
    return {};
  }

  @Post('/send-email-restore-password')
  @HttpCode(200)
  async sendResetLink(@Body() body: SendVerifyCodeDto) {
    const { email } = body;
    await this.usersService.sendResetLink(email);
    return {};
  }
  @Post('/restore-password')
  @HttpCode(200)
  async restorePassword(@Body() body: RestorePasswordDto) {
    await this.usersService.restorePassword(body);
    return {};
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/change-password')
  @HttpCode(200)
  async changePassword(@Body() body: ChangePasswordDto, @Request() req) {
    const { user } = req;
    await this.usersService.changePassword(+user.id, body);
    return {};
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post('block/:id')
  blockUser(@Param('id') id: string) {
    return this.usersService.blockUser(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Get()
  getUsers(@Query() query: GetUsersDto) {
    return this.usersService.getUsers(query);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Patch(':id/activation')
  updateActivation(
    @Param('id') id: string,
    @Body() body: UpdateUserActivationDto,
  ) {
    return this.usersService.updateActivation(+id, body.active);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Patch(':id/role')
  updateRole(@Param('id') id: string, @Body() body: UpdateUserRoleDto) {
    return this.usersService.updateRole(+id, body.roleName);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/current')
  @HttpCode(200)
  async getUserInfo(@Request() req) {
    const {
      user: { id: userId },
    } = req;
    const data = await this.usersService.getUserInfo(userId);
    return data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/edit')
  @UseInterceptors(UserAvatarInterceptor)
  update(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFiles() files?: MulterFile[],
  ) {
    const { user } = req;
    return this.usersService.update(+user.id, updateUserDto, files?.[0]);
  }
}
