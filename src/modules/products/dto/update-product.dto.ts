import { Type } from 'class-transformer';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @Type(() => Number)
  status?: number;

  @IsOptional()
  @IsString()
  tripDuration?: string;

  @IsOptional()
  overviews?: string[];

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tag?: string[];

  @Type(() => Number)
  @IsOptional()
  pageSite: number;

  @Type(() => Number)
  @IsOptional()
  rating?: number;

  @IsOptional()
  @Type(() => Number)
  reviews?: number;
}
