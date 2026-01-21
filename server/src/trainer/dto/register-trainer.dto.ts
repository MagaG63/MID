// dto/register-trainer.dto.ts
import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsArray,
} from 'class-validator';

export class RegisterTrainerDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  description?: string;

  // Для фронтенда - принимаем файлы
  profileImageFile?: Express.Multer.File;

  qualificationImageFiles?: Express.Multer.File[];

  // Для БД - сохраняем пути
  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  qualificationImages?: string[];
}
