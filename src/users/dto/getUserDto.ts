import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';

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
