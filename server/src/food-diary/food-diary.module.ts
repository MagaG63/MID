import { Module } from '@nestjs/common';
import { FoodDiaryController } from './food-diary.controller';
import { FoodDiaryService } from './food-diary.service';

@Module({
  controllers: [FoodDiaryController],
  providers: [FoodDiaryService],
})
export class FoodDiaryModule {}
