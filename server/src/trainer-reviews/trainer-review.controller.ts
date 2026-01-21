import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TrainerReviewService, SafeReviewData } from './trainer-review.service';
import { CreateTrainerReviewDto } from './dto/create-trainer-review.dto';
import { UpdateTrainerReviewDto } from './dto/update-trainer-review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/user.decorator';

@Controller('trainer-reviews')
export class TrainerReviewController {
  constructor(private readonly reviewService: TrainerReviewService) {}

  // Создать отзыв (только авторизованные пользователи)
  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @CurrentUser() user: any,
    @Body() createDto: CreateTrainerReviewDto,
  ): Promise<{ review: SafeReviewData }> {
    const review = await this.reviewService.create(user.sub, createDto);
    return { review };
  }

  // Получить все отзывы тренера
  @Get('trainer/:trainerId')
  async findByTrainerId(
    @Param('trainerId', ParseIntPipe) trainerId: number,
  ): Promise<{ reviews: SafeReviewData[] }> {
    const reviews = await this.reviewService.findByTrainerId(trainerId);
    return { reviews };
  }

  // Получить средний рейтинг тренера
  @Get('trainer/:trainerId/rating')
  async getTrainerRating(
    @Param('trainerId', ParseIntPipe) trainerId: number,
  ): Promise<{ averageRating: number; totalReviews: number }> {
    return await this.reviewService.getTrainerAverageRating(trainerId);
  }

  // Получить отзывы пользователя
  @Get('user/my-reviews')
  @UseGuards(JwtAuthGuard)
  async getMyReviews(
    @CurrentUser() user: any,
  ): Promise<{ reviews: SafeReviewData[] }> {
    const reviews = await this.reviewService.findByUserId(user.sub);
    return { reviews };
  }

  // Получить один отзыв
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ review: SafeReviewData }> {
    const review = await this.reviewService.findOne(id);
    return { review };
  }

  // Обновить отзыв (только автор)
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: any,
    @Body() updateDto: UpdateTrainerReviewDto,
  ): Promise<{ review: SafeReviewData }> {
    const review = await this.reviewService.update(id, user.sub, updateDto);
    return { review };
  }

  // Удалить отзыв (только автор)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: any,
  ): Promise<{ message: string }> {
    await this.reviewService.remove(id, user.sub);
    return { message: 'Отзыв успешно удален' };
  }
}
