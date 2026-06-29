import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ProjectStatus } from 'db/entities/project.entity';

const toOptionalBoolean = (value: unknown) => {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();

    if (normalized === 'true') {
      return true;
    }

    if (normalized === 'false') {
      return false;
    }
  }

  return value;
};

const toOptionalNumberArray = (value: unknown) => {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value.map(Number);
  }

  if (typeof value === 'number') {
    return [value];
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();

    if (!trimmed) {
      return undefined;
    }

    if (trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);

        return Array.isArray(parsed) ? parsed.map(Number) : value;
      } catch {
        return value;
      }
    }

    return trimmed.split(',').map(item => Number(item.trim()));
  }

  return value;
};

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  previewUrl?: string;

  @IsString()
  @IsOptional()
  liveLink?: string;

  @IsString()
  @IsOptional()
  figmaLink?: string;

  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;

  @IsBoolean()
  @Transform(({ value }) => toOptionalBoolean(value))
  @IsOptional()
  nda?: boolean;

  @IsBoolean()
  @Transform(({ value }) => toOptionalBoolean(value))
  @IsOptional()
  isPublished?: boolean;

  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  @Transform(({ value }) => toOptionalNumberArray(value))
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

  @IsString()
  @IsOptional()
  liveLink?: string;

  @IsString()
  @IsOptional()
  figmaLink?: string;

  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;

  @IsBoolean()
  @Transform(({ value }) => toOptionalBoolean(value))
  @IsOptional()
  nda?: boolean;

  @IsBoolean()
  @Transform(({ value }) => toOptionalBoolean(value))
  @IsOptional()
  isPublished?: boolean;

  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  @Transform(({ value }) => toOptionalNumberArray(value))
  @IsOptional()
  tagIds?: number[];
}
