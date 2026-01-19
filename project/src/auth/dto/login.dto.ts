import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsEnum,
} from 'class-validator';

export enum UserRole {
  USER = 'user',
  TRAINER = 'trainer',
}

export class LoginDto {
  @IsOptional()
  @IsString()
  name?: string; // ✅ ДОБАВИЛИ

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
