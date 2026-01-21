// trainer.service.ts - Сервис для работы с тренерами
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Trainer } from './trainer.model';
import * as bcrypt from 'bcrypt';

interface CreateTrainerData {
  name: string;
  email: string;
  password: string;
  description?: string;
  profileImage?: string;
  qualificationImages?: string[];
  experience?: number;
  specializations?: string[];
}

export interface SafeTrainerData {
  id: number;
  name: string;
  email: string;
  description: string;
  profileImage: string;
  qualificationImages: string[];
  experience?: number;
  specializations?: string[];
  rating?: number;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class TrainerService {
  constructor(
    @InjectModel(Trainer)
    private trainerModel: typeof Trainer,
  ) {}

  // В trainer.service.ts должно быть похоже:
  async create(trainerData: CreateTrainerData): Promise<Trainer> {
    try {
      console.log('🔄 Создание тренера:', trainerData.email);

      const hash = await bcrypt.hash(trainerData.password, 10);

      // ✅ Используем явный объект с любыми полями
      const trainerCreateData: any = {
        name: trainerData.name,
        email: trainerData.email,
        password: hash,
        description: trainerData.description || '',
        profileImage:
          trainerData.profileImage || 'https://via.placeholder.com/150',
        // Преобразуем массив в JSON строку для SQLite
        qualificationImages: JSON.stringify(trainerData.qualificationImages || []),
      };

      // Добавляем опциональные поля если они есть
      if (trainerData.experience !== undefined) {
        trainerCreateData.experience = trainerData.experience;
      }
      if (trainerData.specializations) {
        trainerCreateData.specializations = JSON.stringify(trainerData.specializations);
      }

      console.log('📦 Данные для создания тренера:', {
        ...trainerCreateData,
        password: '***HIDDEN***',
      });

      const trainer = await this.trainerModel.create(trainerCreateData);
      return trainer;
    } catch (error) {
      console.error('❌ Ошибка создания тренера:', error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<Trainer | null> {
    return this.trainerModel.findOne({
      where: { email },
    });
  }

  async findById(id: number): Promise<Trainer | null> {
    return this.trainerModel.findByPk(id);
  }

  async getSafeTrainerData(trainer: Trainer): Promise<SafeTrainerData> {
    const data = trainer.toJSON();
    // Удаляем пароль из данных
    const { password, ...rest } = data;
    
    // Парсим qualificationImages если это строка
    let qualificationImages: string[] = [];
    if (rest.qualificationImages) {
      try {
        qualificationImages = typeof rest.qualificationImages === 'string' 
          ? JSON.parse(rest.qualificationImages) 
          : rest.qualificationImages;
      } catch {
        qualificationImages = [];
      }
    }
    
    return {
      ...rest,
      qualificationImages,
    } as SafeTrainerData;
  }

  async validateTrainer(email: string, password: string): Promise<Trainer> {
    const trainer = await this.findByEmail(email);

    if (!trainer) {
      throw new Error('Тренер не найден');
    }

    // Сравниваем пароль с hashpass из БД
    const isValid = await bcrypt.compare(password, trainer.password);

    if (!isValid) {
      throw new Error('Неверный пароль');
    }

    return trainer;
  }

  async getAllTrainers(): Promise<SafeTrainerData[]> {
    const trainers = await this.trainerModel.findAll();

    // Удаляем пароли из всех записей и парсим qualificationImages
    return trainers.map((trainer) => {
      const data = trainer.toJSON();
      const { password, ...rest } = data;
      
      // Парсим qualificationImages если это строка
      let qualificationImages: string[] = [];
      if (rest.qualificationImages) {
        try {
          qualificationImages = typeof rest.qualificationImages === 'string' 
            ? JSON.parse(rest.qualificationImages) 
            : rest.qualificationImages;
        } catch {
          qualificationImages = [];
        }
      }
      
      return {
        ...rest,
        qualificationImages,
      } as SafeTrainerData;
    });
  }

  async updateTrainer(
    id: number,
    updateData: Partial<CreateTrainerData>,
  ): Promise<SafeTrainerData> {
    const trainer = await this.findById(id);

    if (!trainer) {
      throw new Error('Тренер не найден');
    }

    // Подготавливаем данные для обновления
    const dataToUpdate: any = { ...updateData };

    // Если обновляется пароль - хешируем его
    if (dataToUpdate.password) {
      dataToUpdate.password = await bcrypt.hash(dataToUpdate.password, 10);
    }

    // Если есть qualificationImages - преобразуем в JSON строку
    if (dataToUpdate.qualificationImages && Array.isArray(dataToUpdate.qualificationImages)) {
      dataToUpdate.qualificationImages = JSON.stringify(dataToUpdate.qualificationImages);
    }

    await trainer.update(dataToUpdate);

    // Возвращаем безопасные данные
    return this.getSafeTrainerData(trainer);
  }

  async deleteTrainer(id: number): Promise<void> {
    const trainer = await this.findById(id);

    if (trainer) {
      // Просто удаляем тренера (или можно использовать soft delete если добавить поле deletedAt)
      await trainer.destroy();
    }
  }

  async searchTrainers(filters: {
    name?: string;
    specialization?: string;
    minRating?: number;
  }): Promise<SafeTrainerData[]> {
    const where: any = {};

    if (filters.name) {
      where.name = { $like: `%${filters.name}%` };
    }

    // minRating и specialization можно будет использовать когда добавим эти поля в модель

    const trainers = await this.trainerModel.findAll({ where });

    // Удаляем пароли из всех записей и парсим qualificationImages
    return trainers.map((trainer) => {
      const data = trainer.toJSON();
      const { password, ...rest } = data;
      
      // Парсим qualificationImages если это строка
      let qualificationImages: string[] = [];
      if (rest.qualificationImages) {
        try {
          qualificationImages = typeof rest.qualificationImages === 'string' 
            ? JSON.parse(rest.qualificationImages) 
            : rest.qualificationImages;
        } catch {
          qualificationImages = [];
        }
      }
      
      return {
        ...rest,
        qualificationImages,
      } as SafeTrainerData;
    });
  }
}
