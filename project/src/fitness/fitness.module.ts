import { Module } from '@nestjs/common';
import { FitnessService } from './fitness.service';
import { FitnessController } from './fitness.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Fitness } from './fitness.model';

@Module({
  imports: [SequelizeModule.forFeature([Fitness])],
  controllers: [FitnessController],
  providers: [FitnessService],
})
export class FitnessModule {}
