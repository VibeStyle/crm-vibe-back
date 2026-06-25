import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  previewUrl?: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  @IsOptional()
  tagIds?: number[];
}

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  previewUrl?: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  @IsOptional()
  tagIds?: number[];
}
