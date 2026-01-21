// training-program/dto/update-training-program.dto.ts
import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class UpdateTrainingProgramDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(100)
  name?: string;

  @IsString()
  @IsOptional()
  price?: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  contact?: string; // Telegram link
}
