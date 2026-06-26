import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  preferredName: string;

  @IsString()
  @IsOptional()
  middleName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  phoneHome: string;

  @IsString()
  @IsOptional()
  company: string;

  @IsString()
  @IsOptional()
  gender: string;

  @IsString()
  @IsOptional()
  race: string;

  @IsString()
  @IsOptional()
  dateOfBirth: Date;

  @IsString()
  @IsOptional()
  positionApplyingFor: string;

  @IsString()
  @IsOptional()
  faa: string;

  @IsString()
  @IsOptional()
  addressLine1: string;

  @IsString()
  @IsOptional()
  addressLine2: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  zipCode: string;

  @IsBoolean()
  @IsOptional()
  canReceiveCompanyEmails: boolean;

  @IsBoolean()
  @IsOptional()
  canReceivePersonalEmails: boolean;
}
export enum UserStatus {
  Approved = 'approved',
  Denied = 'denied',
}

export class UpdateUserStatusDto {
  @IsString()
  id: string;

  @IsEnum(UserStatus, { message: "status must be 'approved' or 'denied'" })
  @IsString()
  status: UserStatus;
  // status: string;
}

export class UpdateUserActivationDto {
  @IsBoolean()
  active: boolean;
}

export class UpdateUserRoleDto {
  @IsString()
  @IsNotEmpty()
  roleName: string;
}
