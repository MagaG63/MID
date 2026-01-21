import axiosInstance from '@/shared/api/axiosInstance';
import type { TrainingProgramType, CreateTrainingProgramData } from '../model/training-program.type';

class TrainingProgramService {
  // Получить все программы
  static async getAll(): Promise<TrainingProgramType[]> {
    try {
      const response = await axiosInstance.get('/api/training-program');
      return response.data.programs;
    } catch (error: any) {
      console.error('Get all programs error:', error);
      throw error;
    }
  }

  // Получить программы тренера
  static async getByTrainerId(trainerId: number): Promise<TrainingProgramType[]> {
    try {
      const response = await axiosInstance.get(`/api/training-program/trainer/${trainerId}`);
      return response.data.programs;
    } catch (error: any) {
      console.error('Get trainer programs error:', error);
      throw error;
    }
  }

  // Получить одну программу
  static async getById(id: number): Promise<TrainingProgramType> {
    try {
      const response = await axiosInstance.get(`/api/training-program/${id}`);
      return response.data.program;
    } catch (error: any) {
      console.error('Get program error:', error);
      throw error;
    }
  }

  // Создать программу
  static async create(data: CreateTrainingProgramData): Promise<TrainingProgramType> {
    try {
      console.log('🚀 CREATE PROGRAM -> /api/training-program', data);
      const response = await axiosInstance.post('/api/training-program', data);
      return response.data.program;
    } catch (error: any) {
      console.error('Create program error:', error);
      throw error;
    }
  }

  // Обновить программу
  static async update(
    id: number,
    trainerId: number,
    data: Partial<CreateTrainingProgramData>,
  ): Promise<TrainingProgramType> {
    try {
      console.log('🔄 UPDATE PROGRAM -> /api/training-program/' + id, { ...data, trainerId });
      const response = await axiosInstance.put(`/api/training-program/${id}`, {
        ...data,
        trainerId,
      });
      return response.data.program;
    } catch (error: any) {
      console.error('Update program error:', error);
      throw error;
    }
  }

  // Удалить программу
  static async delete(id: number, trainerId: number): Promise<void> {
    try {
      console.log('🗑️ DELETE PROGRAM -> /api/training-program/' + id, { trainerId });
      await axiosInstance.delete(`/api/training-program/${id}`, {
        data: { trainerId },
      });
    } catch (error: any) {
      console.error('Delete program error:', error);
      throw error;
    }
  }
}

export default TrainingProgramService;
