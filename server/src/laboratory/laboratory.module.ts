import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Laboratory } from './laboratory.model';
import { LaboratoryController } from './laboratory.controller';
import { LaboratoryService } from './laboratory.service';

@Module({
  imports: [SequelizeModule.forFeature([Laboratory])],
  controllers: [LaboratoryController],
  providers: [LaboratoryService],
  exports: [LaboratoryService],
})
export class LaboratoryModule {}
