// ✅ Для POST /api/auth/register-trainer
import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsArray,
  IsNotEmpty,
} from 'class-validator';

export class RegisterTrainerDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  profileImage: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  qualificationImages: string[];

  @IsOptional()
  @IsString()
  description?: string;
}
