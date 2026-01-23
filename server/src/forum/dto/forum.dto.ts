import { IsString, IsNotEmpty, IsInt, IsOptional, IsEnum, IsBoolean } from 'class-validator';

export class CreateForumDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  author_id: number;

  @IsInt()
  @IsNotEmpty()
  category_id: number;

  @IsEnum(['active', 'closed', 'archived'])
  @IsOptional()
  status?: string;

  @IsBoolean()
  @IsOptional()
  is_pinned?: boolean;
}
