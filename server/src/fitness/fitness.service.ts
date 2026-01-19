import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Fitness } from './fitness.model';

@Injectable()
export class FitnessService {
  constructor(
    @InjectModel(Fitness)
    private readonly fitnessModel: typeof Fitness,
  ) {}

  async getAll(): Promise<Fitness[]> {
    const fitness = await this.fitnessModel.findAll({
      order: [['rating', 'DESC']], // сортируем по рейтингу
    });
    return fitness;
  }

//   // Если понадобится получить один клуб по ID
//   async getOne(id: number): Promise<Fitness> {
//     const fitness = await this.fitnessModel.findByPk(id);
//     return fitness;
//   }

  // Если понадобится создать клуб
  // async create(dto: CreateFitnessDto): Promise<Fitness> {
  //   const fitness = await this.fitnessModel.create(dto);
  //   return fitness;
  // }
}
