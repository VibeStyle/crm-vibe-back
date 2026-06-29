import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import { TagCategory } from 'db/entities/tag.entity';

export class GetProjectsDto {
  @IsNumberString()
  @IsOptional()
  page?: string;

  @IsNumberString()
  @IsOptional()
  perPage?: string;

  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  tags?: string;

  @IsString()
  @IsOptional()
  industry?: string;

  @IsString()
  @IsOptional()
  workType?: string;

  @IsString()
  @IsOptional()
  stack?: string;

  @IsString()
  @IsOptional()
  qualityLevel?: string;
}

export class GetProjectTagsDto {
  @IsEnum(TagCategory)
  @IsOptional()
  category?: TagCategory;
}
