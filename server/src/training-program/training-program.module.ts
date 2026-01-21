// training-program/training-program.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TrainingProgram } from './training-program.model';
import { Trainer } from '../trainer/trainer.model';
import { TrainingProgramController } from './training-program.controller';
import { TrainingProgramService } from './training-program.service';

@Module({
  imports: [SequelizeModule.forFeature([TrainingProgram, Trainer])],
  controllers: [TrainingProgramController],
  providers: [TrainingProgramService],
  exports: [TrainingProgramService],
})
export class TrainingProgramModule {}
