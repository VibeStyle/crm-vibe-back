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
import { R2StorageService } from 'src/r2/storage.service';

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
    R2StorageService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
