// trainer.service.ts - Обновленный сервис с использованием новых API функций
import { trainerScheme } from '../model/trainer.scheme';
import type { TrainerType } from '../model/trainer.type';
import type { TrainerProfile, TrainerSummary, TrainerLoginDto } from '../model/trainer.interfaces';
import axiosInstance, { setAccessToken } from '@/shared/api/axiosInstance';
import TrainerApi from './trainer.api';

class TrainerService {
  // Методы аутентификации
  static async createTrainer(formData: FormData): Promise<TrainerType> {
    try {
      console.log('🔄 Отправка FormData в TrainerService...');

      // Используем новый API с FormData
      const response = await TrainerApi.register(formData);
      console.log('✅ Регистрация успешна:', response);

      // Устанавливаем токен
      if (response.accessToken) {
        setAccessToken(response.accessToken);
      }

      // Используем trainer из ответа
      const trainerData = response.trainer || response.user;
      
      // Парсим ответ
      const parsed = trainerScheme.safeParse(trainerData);

      if (!parsed.success) {
        console.warn('⚠️ Не удалось распарсить тренера:', parsed.error);
        return trainerData as TrainerType;
      }

      return parsed.data;
    } catch (error: any) {
      console.log('🚨 CREATE ERROR:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      throw new Error(
        error.response?.data?.message || error.message || 'Ошибка регистрации тренера',
      );
    }
  }

  static async loginTrainer(data: TrainerLoginDto): Promise<TrainerType> {
    try {
      console.log('🔄 LOGIN REQUEST:', data.email);

      const response = await TrainerApi.login(data);

      if (response.accessToken) {
        setAccessToken(response.accessToken);
      }

      console.log('✅ LOGIN RESPONSE:', response);

      // Используем user из ответа (сервер возвращает user с ролью trainer)
      const trainerData = response.user || response.trainer;
      
      console.log('📦 Trainer data before parse:', trainerData);
      console.log('📦 qualificationImages type:', typeof trainerData?.qualificationImages);
      console.log('📦 qualificationImages value:', trainerData?.qualificationImages);
      
      const parsed = trainerScheme.safeParse(trainerData);

      if (!parsed.success) {
        console.log('⚠️ Zod parse error:', parsed.error.errors);
        console.log('⚠️ Returning raw data:', trainerData);
        return trainerData as TrainerType;
      }

      console.log('✅ Parsed trainer data:', parsed.data);
      return parsed.data;
    } catch (error: any) {
      console.log('🚨 LOGIN ERROR:', error);
      throw error;
    }
  }

  // Методы получения данных
  static async getAllTrainers(): Promise<TrainerType[]> {
    try {
      const response = await TrainerApi.getAllTrainers();
      return trainerScheme.array().parse(response.trainers);
    } catch (error) {
      console.log('Fetch trainers error:', error);
      throw error;
    }
  }

  static async getTrainerById(id: number): Promise<TrainerProfile> {
    try {
      return await TrainerApi.getTrainerProfile(id);
    } catch (error) {
      console.log('Fetch trainer by id error:', error);
      throw error;
    }
  }

  // Методы поиска и фильтрации
  static async searchTrainers(params: {
    search?: string;
    specializations?: string[];
    rating?: number;
    priceMin?: number;
    priceMax?: number;
    location?: string;
    page?: number;
    limit?: number;
  }): Promise<{ trainers: TrainerSummary[]; pagination: any }> {
    try {
      return await TrainerApi.searchTrainers(params);
    } catch (error) {
      console.log('Search trainers error:', error);
      throw error;
    }
  }

  // Методы управления профилем
  static async updateTrainerProfile(formData: FormData): Promise<TrainerProfile> {
    try {
      const response = await TrainerApi.updateProfile(formData);
      return response.trainer;
    } catch (error) {
      console.log('Update trainer profile error:', error);
      throw error;
    }
  }

  // Методы для работы с файлами
  static async uploadProfileImage(trainerId: number, file: File) {
    try {
      return await TrainerApi.uploadProfileImage(trainerId, file);
    } catch (error) {
      console.log('Upload profile image error:', error);
      throw error;
    }
  }

  static async uploadQualificationImages(trainerId: number, files: File[]) {
    try {
      return await TrainerApi.uploadQualificationImages(trainerId, files);
    } catch (error) {
      console.log('Upload qualification images error:', error);
      throw error;
    }
  }

  // Вспомогательные методы
  static async getAvailableSpecializations(): Promise<string[]> {
    try {
      return await TrainerApi.getAvailableSpecializations();
    } catch (error) {
      console.log('Fetch specializations error:', error);
      throw error;
    }
  }

  static async getAvailableLocations(): Promise<string[]> {
    try {
      return await TrainerApi.getAvailableLocations();
    } catch (error) {
      console.log('Fetch locations error:', error);
      throw error;
    }
  }

  static async getTrainerStats(trainerId: number) {
    try {
      return await TrainerApi.getTrainerStats(trainerId);
    } catch (error) {
      console.log('Fetch trainer stats error:', error);
      throw error;
    }
  }
}

export default TrainerService;
