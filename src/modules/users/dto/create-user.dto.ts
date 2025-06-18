import { IsBoolean, IsEAN, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
