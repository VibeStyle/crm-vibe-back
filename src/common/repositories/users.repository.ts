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
        'user.preferredName',
        'user.middleName',
        'user.lastName',
        'user.phone',
        'user.phoneHome',
        'user.company',
        'user.gender',
        'user.race',
        'user.dateOfBirth',
        'user.positionApplyingFor',
        'user.faa',
        'user.addressLine1',
        'user.addressLine2',
        'user.city',
        'user.state',
        'user.zipCode',
        'user.canReceiveCompanyEmails',
        'user.canReceivePersonalEmails',
        'user.type',
        'user.active',
        'user.status',
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
        'user.preferredName',
        'user.middleName',
        'user.lastName',
        'user.phone',
        'user.phoneHome',
        'user.company',
        'user.gender',
        'user.race',
        'user.dateOfBirth',
        'user.positionApplyingFor',
        'user.faa',
        'user.addressLine1',
        'user.addressLine2',
        'user.city',
        'user.state',
        'user.zipCode',
        'user.canReceiveCompanyEmails',
        'user.canReceivePersonalEmails',
        'user.type',
        'user.active',
        'user.status',
        'Roles.id',
      ])
      .where('email= :email', { email })
      .getOne();
  }
}
