// update-user.dto.ts
import { IsString, IsOptional, IsEnum, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEnum(['User', 'Admin'])
  role?: 'User' | 'Admin';
}
