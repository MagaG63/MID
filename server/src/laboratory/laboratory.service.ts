import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Laboratory } from './laboratory.model';

export interface SafeLaboratoryData {
  id: number;
  name: string;
  stated: string;
  status: string;
  post: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class LaboratoryService {
  constructor(
    @InjectModel(Laboratory)
    private laboratoryModel: typeof Laboratory,
  ) {}

  // Получить все лаборатории
  async findAll(): Promise<SafeLaboratoryData[]> {
    const laboratories = await this.laboratoryModel.findAll({
      order: [['createdAt', 'DESC']],
    });

    return laboratories.map((lab) => this.toSafeData(lab));
  }

  // Получить одну лабораторию по ID
  async findOne(id: number): Promise<SafeLaboratoryData> {
    const laboratory = await this.laboratoryModel.findByPk(id);

    if (!laboratory) {
      throw new NotFoundException(`Лаборатория с ID ${id} не найдена`);
    }

    return this.toSafeData(laboratory);
  }

  // Преобразовать в безопасные данные
  private toSafeData(laboratory: Laboratory): SafeLaboratoryData {
    return {
      id: laboratory.id,
      name: laboratory.name,
      stated: laboratory.stated || '',
      status: laboratory.status || '',
      post: laboratory.post || '',
      createdAt: laboratory.createdAt,
      updatedAt: laboratory.updatedAt,
    };
  }
}
