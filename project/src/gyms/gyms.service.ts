import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Gym } from './gym.model';

@Injectable()
export class GymsService {
  constructor(@InjectModel(Gym) private gymsModel: typeof Gym) {}

  async getAll(): Promise<Gym[]> {
    return this.gymsModel.findAll();
  }
}
