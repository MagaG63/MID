import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Trainer } from './trainer.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TrainerService {
  constructor(@InjectModel(Trainer) private trainerModel: typeof Trainer) {}

  async getAll() {
    return this.trainerModel.findAll({
      attributes: [
        'id',
        'name',
        'email',
        'description',
        'profileImage',
        'qualificationImages',
      ],
    });
  }

  async create(dto: any): Promise<Trainer> {
    const hash = await bcrypt.hash(dto.password, 12);
    const [trainer, created] = await this.trainerModel.findOrCreate({
      where: { email: dto.email },
      defaults: { ...dto, hashpass: hash },
    });
    if (!created) throw new ConflictException('Trainer already exists');
    const plain = { ...trainer.get() };
    delete (plain as any).hashpass;
    return plain as Trainer;
  }

  async validateTrainer(email: string, password: string): Promise<Trainer> {
    const trainer = await this.trainerModel.findOne({ where: { email } });
    if (!trainer || !(await bcrypt.compare(password, trainer.hashpass))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const plain = { ...trainer.get() };
    delete (plain as any).hashpass;
    return plain as Trainer;
  }

  async findById(id: number): Promise<Trainer> {
    const trainer = await this.trainerModel.findByPk(id);
    if (!trainer) throw new UnauthorizedException('Trainer not found');
    const plain = { ...trainer.get() };
    delete (plain as any).hashpass;
    return plain as Trainer;
  }

  async getTrainerProfile(id: number) {
    const trainer = await this.trainerModel.findByPk(id, {
      attributes: { exclude: ['hashpass'] },
    });
    if (!trainer) throw new NotFoundException('Trainer not found');
    return trainer;
  }

  async getTrainerPlans(trainerId: number) {
    return { trainerId, plans: [] }; // Заглушка для планов тренировок
  }
}
