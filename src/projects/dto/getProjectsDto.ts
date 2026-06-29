import {
  IsBooleanString,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProjectStatus } from 'db/entities/project.entity';
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

  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;

  @IsBooleanString()
  @IsOptional()
  nda?: string;
}

export class GetProjectTagsDto {
  @IsEnum(TagCategory)
  @IsOptional()
  category?: TagCategory;
}
