import { Module } from '@nestjs/common';
import { GymsService } from './gyms.service';
import { GymsController } from './gyms.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Gym } from './gym.model';

@Module({
  imports: [SequelizeModule.forFeature([Gym])],
  controllers: [GymsController],
  providers: [GymsService],
  exports: [GymsService],
})
export class GymsModule {}
