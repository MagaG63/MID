import { IsInt, IsString, IsOptional, Min, Max } from 'class-validator';

export class UpdateTrainerReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  rate?: number;

  @IsString()
  @IsOptional()
  text?: string;
}
