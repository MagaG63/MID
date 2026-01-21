import axiosInstance from '@/shared/api/axiosInstance';
import type { TrainerReviewType, CreateTrainerReviewData, TrainerRatingData } from '../model/trainer-review.type';

class TrainerReviewService {
  // Получить отзывы тренера
  static async getByTrainerId(trainerId: number): Promise<TrainerReviewType[]> {
    try {
      const response = await axiosInstance.get(`/api/trainer-reviews/trainer/${trainerId}`);
      return response.data.reviews;
    } catch (error: any) {
      console.error('Get trainer reviews error:', error);
      throw error;
    }
  }

  // Получить рейтинг тренера
  static async getTrainerRating(trainerId: number): Promise<TrainerRatingData> {
    try {
      const response = await axiosInstance.get(`/api/trainer-reviews/trainer/${trainerId}/rating`);
      return response.data;
    } catch (error: any) {
      console.error('Get trainer rating error:', error);
      throw error;
    }
  }

  // Создать отзыв
  static async create(data: CreateTrainerReviewData): Promise<TrainerReviewType> {
    try {
      console.log('🚀 CREATE REVIEW -> /api/trainer-reviews', data);
      const response = await axiosInstance.post('/api/trainer-reviews', data);
      return response.data.review;
    } catch (error: any) {
      console.error('Create review error:', error);
      throw error;
    }
  }

  // Обновить отзыв
  static async update(id: number, data: { rate?: number; text?: string }): Promise<TrainerReviewType> {
    try {
      console.log('🔄 UPDATE REVIEW -> /api/trainer-reviews/' + id, data);
      const response = await axiosInstance.put(`/api/trainer-reviews/${id}`, data);
      return response.data.review;
    } catch (error: any) {
      console.error('Update review error:', error);
      throw error;
    }
  }

  // Удалить отзыв
  static async delete(id: number): Promise<void> {
    try {
      console.log('🗑️ DELETE REVIEW -> /api/trainer-reviews/' + id);
      await axiosInstance.delete(`/api/trainer-reviews/${id}`);
    } catch (error: any) {
      console.error('Delete review error:', error);
      throw error;
    }
  }

  // Получить мои отзывы
  static async getMyReviews(): Promise<TrainerReviewType[]> {
    try {
      const response = await axiosInstance.get('/api/trainer-reviews/user/my-reviews');
      return response.data.reviews;
    } catch (error: any) {
      console.error('Get my reviews error:', error);
      throw error;
    }
  }
}

export default TrainerReviewService;
