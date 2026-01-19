import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GymsReviewsService } from './gyms-reviews.service';
import { GymsReviewsController } from './gyms-reviews.controller';
import { GymReviews } from './gyms-reviews.model';

@Module({
  imports: [SequelizeModule.forFeature([GymReviews])],
  controllers: [GymsReviewsController],
  providers: [GymsReviewsService],
  exports: [GymsReviewsService],
})
export class GymsReviewsModule {}
