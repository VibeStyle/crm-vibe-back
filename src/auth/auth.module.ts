import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { RolesRepository, UsersRepository } from 'src/common/repositories';
import * as Strategies from './strategies';
import { UsersService } from 'src/users/users.service';
import { MailService, NodemailerService } from 'src/shared/services';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([UsersRepository]),
    UsersModule,
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [
    ...Object.values(Strategies),
    AuthService,
    UsersRepository,
    UsersService,
    NodemailerService,
    MailService,
    RolesRepository,
  ],
  exports: [AuthService],
})
export class AuthModule {}
