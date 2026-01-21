// training-program/dto/create-training-program.dto.ts
import { IsString, IsNotEmpty, IsNumber, IsUrl, MinLength, MaxLength } from 'class-validator';

export class CreateTrainingProgramDto {
  @IsNumber()
  @IsNotEmpty()
  trainerId: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  contact: string; // Telegram link (например: @username или https://t.me/username)
}
