import { IsInt, IsString, IsOptional, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateTrainerReviewDto {
  @IsInt()
  @IsNotEmpty()
  trainerId: number;

  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rate: number;

  @IsString()
  @IsOptional()
  text?: string;
}
