import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TrainerReview } from './trainer-review.model';
import { TrainerReviewController } from './trainer-review.controller';
import { TrainerReviewService } from './trainer-review.service';
import { User } from '../user/user.model';
import { Trainer } from '../trainer/trainer.model';

@Module({
  imports: [SequelizeModule.forFeature([TrainerReview, User, Trainer])],
  controllers: [TrainerReviewController],
  providers: [TrainerReviewService],
  exports: [TrainerReviewService],
})
export class TrainerReviewModule {}
