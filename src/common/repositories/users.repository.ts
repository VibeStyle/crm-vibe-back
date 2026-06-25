import { Users } from 'db/entities';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

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
        'user.dateOfBirth',
        'user.blocked',
        'user.active',
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
        'user.dateOfBirth',
        'user.blocked',
        'user.active',
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
}
