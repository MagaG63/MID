import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TrainerReview } from './trainer-review.model';
import { CreateTrainerReviewDto } from './dto/create-trainer-review.dto';
import { UpdateTrainerReviewDto } from './dto/update-trainer-review.dto';
import { User } from '../user/user.model';
import { Trainer } from '../trainer/trainer.model';

export interface SafeReviewData {
  id: number;
  userId: number;
  trainerId: number;
  rate: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: number;
    name: string;
  };
}

@Injectable()
export class TrainerReviewService {
  constructor(
    @InjectModel(TrainerReview)
    private trainerReviewModel: typeof TrainerReview,
  ) {}

  // Создать отзыв
  async create(userId: number, createDto: CreateTrainerReviewDto): Promise<SafeReviewData> {
    // Проверяем, не оставлял ли пользователь уже отзыв этому тренеру
    const existingReview = await this.trainerReviewModel.findOne({
      where: {
        userId,
        trainerId: createDto.trainerId,
      },
    });

    if (existingReview) {
      throw new BadRequestException('Вы уже оставили отзыв этому тренеру');
    }

    const review = await this.trainerReviewModel.create({
      userId,
      trainerId: createDto.trainerId,
      rate: createDto.rate,
      text: createDto.text || '',
    });

    // Загружаем отзыв с данными пользователя
    const reviewWithUser = await this.trainerReviewModel.findByPk(review.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
    });

    return this.toSafeDataWithUser(reviewWithUser!);
  }

  // Получить все отзывы тренера
  async findByTrainerId(trainerId: number): Promise<SafeReviewData[]> {
    const reviews = await this.trainerReviewModel.findAll({
      where: { trainerId },
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return reviews.map((review) => this.toSafeDataWithUser(review));
  }

  // Получить один отзыв
  async findOne(id: number): Promise<SafeReviewData> {
    const review = await this.trainerReviewModel.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!review) {
      throw new NotFoundException('Отзыв не найден');
    }

    return this.toSafeDataWithUser(review);
  }

  // Обновить отзыв
  async update(
    id: number,
    userId: number,
    updateDto: UpdateTrainerReviewDto,
  ): Promise<SafeReviewData> {
    const review = await this.trainerReviewModel.findByPk(id);

    if (!review) {
      throw new NotFoundException('Отзыв не найден');
    }

    // Проверяем, что пользователь - автор отзыва
    if (review.userId !== userId) {
      throw new ForbiddenException('Вы можете редактировать только свои отзывы');
    }

    await review.update(updateDto);

    return this.toSafeData(review);
  }

  // Удалить отзыв
  async remove(id: number, userId: number): Promise<void> {
    const review = await this.trainerReviewModel.findByPk(id);

    if (!review) {
      throw new NotFoundException('Отзыв не найден');
    }

    // Проверяем, что пользователь - автор отзыва
    if (review.userId !== userId) {
      throw new ForbiddenException('Вы можете удалять только свои отзывы');
    }

    await review.destroy();
  }

  // Получить средний рейтинг тренера
  async getTrainerAverageRating(trainerId: number): Promise<{ averageRating: number; totalReviews: number }> {
    const reviews = await this.trainerReviewModel.findAll({
      where: { trainerId },
      attributes: ['rate'],
    });

    if (reviews.length === 0) {
      return { averageRating: 0, totalReviews: 0 };
    }

    const sum = reviews.reduce((acc, review) => acc + review.rate, 0);
    const averageRating = Math.round((sum / reviews.length) * 10) / 10; // Округляем до 1 знака

    return {
      averageRating,
      totalReviews: reviews.length,
    };
  }

  // Получить отзывы пользователя
  async findByUserId(userId: number): Promise<SafeReviewData[]> {
    const reviews = await this.trainerReviewModel.findAll({
      where: { userId },
      include: [
        {
          model: Trainer,
          attributes: ['id', 'name'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return reviews.map((review) => this.toSafeData(review));
  }

  // Преобразовать в безопасные данные
  private toSafeData(review: TrainerReview): SafeReviewData {
    return {
      id: review.id,
      userId: review.userId,
      trainerId: review.trainerId,
      rate: review.rate,
      text: review.text || '',
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };
  }

  // Преобразовать в безопасные данные с информацией о пользователе
  private toSafeDataWithUser(review: TrainerReview): SafeReviewData {
    const safeData = this.toSafeData(review);
    
    if (review.user) {
      safeData.user = {
        id: review.user.id,
        name: review.user.name,
      };
    }

    return safeData;
  }
}
