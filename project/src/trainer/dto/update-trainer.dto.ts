import {
  IsString,
  IsOptional,
  IsArray,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class UpdateTrainerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  profileImage?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  qualificationImages?: string[];

  @IsOptional()
  @IsString()
  description?: string;
}
