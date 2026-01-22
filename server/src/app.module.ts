// ✅ Эндпоинты: /api/auth/*, /api/user/*, /api/trainer/*, /api/food-diary/*, /api/training-program/*, /api/trainer-reviews/*, /api/laboratory/*
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { Fitness } from './fitness/fitness.model';
import { FitnessModule } from './fitness/fitness.module';
import { Trainer } from './trainer/trainer.model';
import { Forum } from './forum/forum.model';
import { TrainingProgram } from './training-program/training-program.model';
import { TrainerReview } from './trainer-reviews/trainer-review.model';
import { Laboratory } from './laboratory/laboratory.model';
import { UserModule } from './user/user.module';
import { TrainerModule } from './trainer/trainer.module';
import { AuthModule } from './auth/auth.module';
import { GymsModule } from './gyms/gyms.module';
import { GymsReviewsModule } from './gyms-reviews/gyms-reviews.module';
import { FoodDiaryModule } from './food-diary/food-diary.module';
import { TrainingProgramModule } from './training-program/training-program.module';
import { TrainerReviewModule } from './trainer-reviews/trainer-review.module';
import { LaboratoryModule } from './laboratory/laboratory.module';
import dotenv from 'dotenv';
import { ForumModule } from './forum/forum.module';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/comment.model';
dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './database.sqlite',
      autoLoadModels: true,
      synchronize: false,
      models: [
        User,
        Fitness,
        Trainer,
        Forum,
        TrainingProgram,
        TrainerReview,
        Comment,
        Laboratory,
      ],
      logging: false,
    }),

    UserModule,
    FitnessModule,
    TrainerModule,
    AuthModule,
    GymsModule,
    GymsReviewsModule,
    FoodDiaryModule,
    ForumModule,
    CommentModule,
    TrainingProgramModule,
    TrainerReviewModule,
    LaboratoryModule,
  ],
})
export class AppModule {}
