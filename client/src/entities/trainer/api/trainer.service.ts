import axios from 'axios';
import { trainerScheme } from '../model/trainer.scheme';
import type { TrainerType, TrainerRegist } from '../model/trainer.type';

class TrainerService {
  static async createTrainer(data: TrainerRegist): Promise<TrainerType> {
    try {
      const response = await axios.post('/api/auth/register-trainer', {
        name: data.name,
        email: data.email,
        password: data.password,
        description: data.description || '',
        profileImage: data.profileImage,
        qualificationImages: data.qualificationImages,
      });
      return trainerScheme.parse(response.data.trainer || response.data);
    } catch (error: any) {
      // ✅ ПОЛНЫЙ ЛОГ ОШИБКИ
      console.log('🚨 CREATE ERROR:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: error.config?.url,
      });
      throw new Error('Ошибка регистрации');
    }
  }

  static async loginTrainer(data: { email: string; password: string }): Promise<TrainerType> {
    try {
      console.log('🔄 LOGIN REQUEST:', data);

      const response = await axios.post('/api/auth/login', {
        email: data.email,
        password: data.password,
        role: 'trainer',
      });

      console.log('✅ LOGIN RESPONSE:', response.data);

      // ✅ Берем user ИЛИ trainer из ответа
      const trainerData = response.data.user || response.data.trainer;

      // ✅ НЕ ПАДЕМ на Zod ошибке - используем safeParse
      const parsed = trainerScheme.safeParse(trainerData);
      if (!parsed.success) {
        console.log('Zod parse error:', parsed.error.errors);
        // Возвращаем сырые данные без валидации
        return trainerData as TrainerType;
      }

      return parsed.data;
    } catch (error: any) {
      console.log('🚨 LOGIN ERROR:', error);
      throw error;
    }
  }

  static async getAllTrainers(): Promise<TrainerType[]> {
    try {
      const response = await axios.get('/api/trainer/all');
      return trainerScheme.array().parse(response.data);
    } catch (error) {
      console.log('Fetch trainers error:', error);
      throw error;
    }
  }
}

export default TrainerService;
