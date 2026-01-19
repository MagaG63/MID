
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class RegisterUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
