import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNotEmpty, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @Type(() => Number)
  price: number;

  @Type(() => Number)
  @IsOptional()
  pageSite: number;

  @Type(() => Number)
  @IsOptional()
  rating?: number;

  @IsOptional()
  @Type(() => Number)
  reviews?: number;

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

}
