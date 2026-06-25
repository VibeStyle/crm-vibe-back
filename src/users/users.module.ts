import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'db/entities';
import { RolesRepository, UsersRepository } from 'src/common/repositories';
import { MailService, NodemailerService } from 'src/shared/services';
import { AuthService } from 'src/auth/auth.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([Users]),
    HttpModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersRepository,
    UsersService,
    NodemailerService,
    AuthService,
    RolesRepository,
    MailService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
