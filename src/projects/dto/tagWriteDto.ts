import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TagCategory } from 'db/entities/tag.entity';

export class CreateTagDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsEnum(TagCategory)
  category: TagCategory;
}

export class UpdateTagDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsEnum(TagCategory)
  @IsOptional()
  category?: TagCategory;
}
