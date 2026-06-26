import {
  IsBooleanString,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export enum AppraiserFilter {
  All = 'all',
  Active = 'active',
  Blocked = 'blocked',
}

export class GetAllAppraisersDto {
  @IsEnum(AppraiserFilter)
  @IsOptional()
  filter?: AppraiserFilter;
}

export class GetRegisterUsers {
  @IsNumberString()
  @IsOptional()
  page?: number;

  @IsNumberString()
  @IsOptional()
  perPage?: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  search?: string;
}

export class GetUsersDto {
  @IsNumberString()
  @IsOptional()
  page?: string;

  @IsNumberString()
  @IsOptional()
  perPage?: string;

  @IsString()
  @IsOptional()
  search?: string;

  @IsBooleanString()
  @IsOptional()
  emailVerified?: string;

  @IsBooleanString()
  @IsOptional()
  active?: string;

  @IsBooleanString()
  @IsOptional()
  blocked?: string;
}
