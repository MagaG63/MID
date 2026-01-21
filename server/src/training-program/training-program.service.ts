// training-program/training-program.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TrainingProgram } from './training-program.model';
import { Trainer } from '../trainer/trainer.model';
import { CreateTrainingProgramDto } from './dto/create-training-program.dto';
import { UpdateTrainingProgramDto } from './dto/update-training-program.dto';

export interface SafeTrainingProgramData {
  id: number;
  trainerId: number;
  name: string;
  price: string;
  contact: string;
  createdAt: Date;
  updatedAt: Date;
  trainer?: {
    id: number;
    name: string;
    email: string;
    profileImage: string;
  };
}

@Injectable()
export class TrainingProgramService {
  constructor(
    @InjectModel(TrainingProgram)
    private trainingProgramModel: typeof TrainingProgram,
  ) {}

  // Создание программы тренировок
  async create(dto: CreateTrainingProgramDto): Promise<SafeTrainingProgramData> {
    try {
      console.log('🔄 Создание программы тренировок:', dto);

      const program = await this.trainingProgramModel.create({
        trainerId: dto.trainerId,
        name: dto.name,
        price: dto.price,
        contact: dto.contact,
      } as any);

      console.log('✅ Программа создана:', program.id);

      return this.getSafeProgramData(program);
    } catch (error) {
      console.error('❌ Ошибка создания программы:', error);
      throw error;
    }
  }

  // Получение всех программ
  async findAll(): Promise<SafeTrainingProgramData[]> {
    const programs = await this.trainingProgramModel.findAll({
      include: [
        {
          model: Trainer,
          attributes: ['id', 'name', 'email', 'profileImage'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return programs.map((program) => this.getSafeProgramData(program));
  }

  // Получение программ конкретного тренера
  async findByTrainerId(trainerId: number): Promise<SafeTrainingProgramData[]> {
    const programs = await this.trainingProgramModel.findAll({
      where: { trainerId },
      include: [
        {
          model: Trainer,
          attributes: ['id', 'name', 'email', 'profileImage'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return programs.map((program) => this.getSafeProgramData(program));
  }

  // Получение одной программы по ID
  async findOne(id: number): Promise<SafeTrainingProgramData> {
    const program = await this.trainingProgramModel.findByPk(id, {
      include: [
        {
          model: Trainer,
          attributes: ['id', 'name', 'email', 'profileImage'],
        },
      ],
    });

    if (!program) {
      throw new NotFoundException(`Программа тренировок с ID ${id} не найдена`);
    }

    return this.getSafeProgramData(program);
  }

  // Обновление программы
  async update(
    id: number,
    trainerId: number,
    dto: UpdateTrainingProgramDto,
  ): Promise<SafeTrainingProgramData> {
    const program = await this.trainingProgramModel.findByPk(id);

    if (!program) {
      throw new NotFoundException(`Программа тренировок с ID ${id} не найдена`);
    }

    // Проверяем, что программа принадлежит тренеру
    if (program.trainerId !== trainerId) {
      throw new ForbiddenException('Вы не можете редактировать эту программу');
    }

    await program.update(dto);

    return this.getSafeProgramData(program);
  }

  // Удаление программы
  async remove(id: number, trainerId: number): Promise<void> {
    const program = await this.trainingProgramModel.findByPk(id);

    if (!program) {
      throw new NotFoundException(`Программа тренировок с ID ${id} не найдена`);
    }

    // Проверяем, что программа принадлежит тренеру
    if (program.trainerId !== trainerId) {
      throw new ForbiddenException('Вы не можете удалить эту программу');
    }

    await program.destroy();
  }

  // Вспомогательный метод для безопасного возврата данных
  private getSafeProgramData(program: TrainingProgram): SafeTrainingProgramData {
    const data = program.toJSON() as any;

    const result: SafeTrainingProgramData = {
      id: data.id,
      trainerId: data.trainerId,
      name: data.name,
      price: data.price,
      contact: data.contact,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };

    // Добавляем информацию о тренере если она есть
    if (data.trainer) {
      result.trainer = {
        id: data.trainer.id,
        name: data.trainer.name,
        email: data.trainer.email,
        profileImage: data.trainer.profileImage,
      };
    }

    return result;
  }
}
