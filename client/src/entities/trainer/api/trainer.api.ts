// Базовые API клиентские функции для системы профилей тренеров
// Требования: 5.1, 5.2, 5.3, 5.4

import axiosInstance from '@/shared/api/axiosInstance';
import type {
  TrainerProfile,
  TrainerSummary,
  CreateTrainerProfileDto,
  UpdateTrainerProfileDto,
  TrainerSearchParams,
  TrainerLoginDto,
  TrainerApiResponse,
  TrainersListApiResponse,
  TrainerAuthResponse,
  FileInfo,
} from '../model/trainer.interfaces';

export class TrainerApi {
  // Аутентификация
  static async login(credentials: TrainerLoginDto): Promise<TrainerAuthResponse> {
    const response = await axiosInstance.post<TrainerAuthResponse>('/api/auth/login', {
      ...credentials,
      role: 'trainer',
    });
    return response.data;
  }

  // УПРОЩЕННАЯ РЕГИСТРАЦИЯ - РАБОЧАЯ ВЕРСИЯ
  static async register(formData: FormData): Promise<TrainerAuthResponse> {
    console.log('📤 Отправка регистрации тренера...');

    // Логируем содержимое FormData
    for (const [key, value] of formData.entries()) {
      console.log(
        `🔍 FormData поле: ${key} =`,
        value instanceof File ? `${value.name} (${value.size} bytes)` : value,
      );
    }

    const response = await axiosInstance.post<TrainerAuthResponse>(
      '/api/auth/register-trainer',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    console.log('✅ Регистрация успешна:', response.data);
    return response.data;
  }

  static async logout(): Promise<void> {
    await axiosInstance.post('/api/auth/logout');
  }

  static async refreshToken(): Promise<TrainerAuthResponse> {
    const response = await axiosInstance.post<TrainerAuthResponse>('/api/auth/refresh');
    return response.data;
  }

  // Получение данных тренеров
  static async getAllTrainers(params?: TrainerSearchParams): Promise<TrainersListApiResponse> {
    const response = await axiosInstance.get<TrainersListApiResponse>('/api/trainer', {
      params,
    });
    return response.data;
  }

  static async getTrainerById(id: number): Promise<TrainerApiResponse> {
    const response = await axiosInstance.get<TrainerApiResponse>(`/api/trainer/${id}`);
    return response.data;
  }

  static async getTrainerProfile(id: number): Promise<TrainerProfile> {
    const response = await axiosInstance.get<{ trainer: TrainerProfile }>(
      `/api/trainer/${id}/profile`,
    );
    return response.data.trainer;
  }

  // Поиск и фильтрация
  static async searchTrainers(params: TrainerSearchParams): Promise<TrainersListApiResponse> {
    const response = await axiosInstance.get<TrainersListApiResponse>('/api/trainer/search', {
      params,
    });
    return response.data;
  }

  static async getTrainersBySpecialization(specialization: string): Promise<TrainerSummary[]> {
    const response = await axiosInstance.get<{ trainers: TrainerSummary[] }>(
      `/api/trainer/specialization/${specialization}`,
    );
    return response.data.trainers;
  }

  static async getTrainersByLocation(location: string): Promise<TrainerSummary[]> {
    const response = await axiosInstance.get<{ trainers: TrainerSummary[] }>(
      `/api/trainer/location/${location}`,
    );
    return response.data.trainers;
  }

  // Управление профилем (для авторизованных тренеров)
  static async updateProfile(formData: FormData): Promise<TrainerApiResponse> {
    console.log('📤 Отправка обновления профиля тренера на /api/trainer/profile');
    
    // Логируем содержимое FormData
    for (const [key, value] of formData.entries()) {
      console.log(
        `🔍 FormData поле: ${key} =`,
        value instanceof File ? `${value.name} (${value.size} bytes)` : value,
      );
    }

    try {
      const response = await axiosInstance.put<TrainerApiResponse>('/api/trainer/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('✅ Обновление успешно:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Ошибка обновления профиля:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
      });
      throw error;
    }
  }

  static async deleteProfile(id: number): Promise<void> {
    await axiosInstance.delete(`/api/trainer/${id}`);
  }

  // Управление файлами
  static async uploadProfileImage(trainerId: number, file: File): Promise<FileInfo> {
    const formData = new FormData();
    formData.append('profileImage', file);
    formData.append('trainerId', trainerId.toString());

    const response = await axiosInstance.post<{ file: FileInfo }>(
      '/api/trainer/upload/profile-image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data.file;
  }

  static async uploadQualificationImages(trainerId: number, files: File[]): Promise<FileInfo[]> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('qualificationImages', file);
    });
    formData.append('trainerId', trainerId.toString());

    const response = await axiosInstance.post<{ files: FileInfo[] }>(
      '/api/trainer/upload/qualification-images',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data.files;
  }

  static async deleteFile(fileId: string): Promise<void> {
    await axiosInstance.delete(`/api/trainer/file/${fileId}`);
  }

  // Статистика и аналитика
  static async getTrainerStats(trainerId: number): Promise<{
    profileViews: number;
    contactRequests: number;
    rating: number;
    reviewsCount: number;
  }> {
    const response = await axiosInstance.get(`/api/trainer/${trainerId}/stats`);
    return response.data;
  }

  // Получение специализаций и локаций для фильтров
  static async getAvailableSpecializations(): Promise<string[]> {
    const response = await axiosInstance.get<{ specializations: string[] }>(
      '/api/trainer/specializations',
    );
    return response.data.specializations;
  }

  static async getAvailableLocations(): Promise<string[]> {
    const response = await axiosInstance.get<{ locations: string[] }>('/api/trainer/locations');
    return response.data.locations;
  }
}

export default TrainerApi;
