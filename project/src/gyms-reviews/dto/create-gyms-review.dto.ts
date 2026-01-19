import { IsInt, IsString, IsOptional, Min, Max } from 'class-validator';

export class CreateGymsReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rate: number;

  @IsInt()
  @IsOptional()
  userId?: number;

  @IsInt()
  @IsOptional()
  trainerId?: number;

  @IsString()
  content: string;

  @IsInt()
  gymId: number;

  @IsString()
  @IsOptional()
  like?: string;

  @IsString()
  @IsOptional()
  dislike?: string;
}
