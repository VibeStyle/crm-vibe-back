import { Users } from 'db/entities';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

export type GetUsersListParams = {
  page?: number;
  perPage?: number;
  search?: string;
  emailVerified?: boolean;
  active?: boolean;
  blocked?: boolean;
};

@Injectable()
export class UsersRepository extends Repository<Users> {
  constructor(private readonly ds: DataSource) {
    super(Users, ds.createEntityManager());
  }

  getUserById(id: number): Promise<Users> {
    return this.findOne({
      where: {
        id,
      },
    });
  }

  getUser(email: string): Promise<Users> {
    return this.findOne({
      where: {
        email,
      },
    });
  }

  getUserInfo(id: number): Promise<Users> {
    return this.createQueryBuilder('user')
      .select([
        'user.id',
        'user.email',
        'user.firstName',
        'user.lastName',
        'user.phone',
        'user.avatarUrl',
        'user.avatarKey',
        'user.dateOfBirth',
        'user.blocked',
        'user.active',
        'user.emailVerified',
        'user.failedLoginAttempts',
        'user.loginLockedUntil',
        'user.loginLockoutCount',
        'user.lastFailedLoginAt',
        'user.roleId',
        'user.updatedAt',
      ])
      .where({ id })
      .getOne();
  }

  getUserWithRole(email: string): Promise<Users> {
    return this.createQueryBuilder('user')
      .innerJoin('user.role', 'Roles')
      .select([
        'user.id',
        'user.email',
        'user.firstName',
        'user.lastName',
        'user.phone',
        'user.avatarUrl',
        'user.avatarKey',
        'user.dateOfBirth',
        'user.blocked',
        'user.active',
        'user.emailVerified',
        'user.failedLoginAttempts',
        'user.loginLockedUntil',
        'user.loginLockoutCount',
        'user.lastFailedLoginAt',
        'user.roleId',
        'user.updatedAt',
        'Roles.id',
        'Roles.name',
      ])
      .where('email= :email', { email })
      .getOne();
  }

  async getUsersList(params: GetUsersListParams) {
    const page = params.page ?? 1;
    const perPage = params.perPage ?? 20;

    const query = this.createQueryBuilder('user')
      .leftJoin('user.role', 'role')
      .select([
        'user.id',
        'user.email',
        'user.firstName',
        'user.lastName',
        'user.phone',
        'user.avatarUrl',
        'user.avatarKey',
        'user.dateOfBirth',
        'user.blocked',
        'user.active',
        'user.emailVerified',
        'user.roleId',
        'user.createdAt',
        'user.updatedAt',
        'role.id',
        'role.name',
      ])
      .orderBy('user.createdAt', 'DESC')
      .skip((page - 1) * perPage)
      .take(perPage);

    if (params.search) {
      query.andWhere(
        '(user.email ILIKE :search OR user.firstName ILIKE :search OR user.lastName ILIKE :search)',
        { search: `%${params.search}%` },
      );
    }

    if (typeof params.emailVerified === 'boolean') {
      query.andWhere('user.emailVerified = :emailVerified', {
        emailVerified: params.emailVerified,
      });
    }

    if (typeof params.active === 'boolean') {
      query.andWhere('user.active = :active', { active: params.active });
    }

    if (typeof params.blocked === 'boolean') {
      query.andWhere('user.blocked = :blocked', { blocked: params.blocked });
    }

    const [items, total] = await query.getManyAndCount();

    return {
      items,
      total,
      page,
      perPage,
    };
  }
}
