// ✅ Эндпоинты: /api/auth/*, /api/user/*, /api/trainer/*, /api/food-diary/*
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { Fitness } from './fitness/fitness.model';
import { FitnessModule } from './fitness/fitness.module';
import { Trainer } from './trainer/trainer.model';
import { Forum } from './forum/forum.model';
import { UserModule } from './user/user.module';
import { TrainerModule } from './trainer/trainer.module';
import { AuthModule } from './auth/auth.module';
import { GymsModule } from './gyms/gyms.module';
import { GymsReviewsModule } from './gyms-reviews/gyms-reviews.module';
import { FoodDiaryModule } from './food-diary/food-diary.module';
import dotenv from 'dotenv';
import { ForumModule } from './forum/forum.module';
dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './database.sqlite',
      autoLoadModels: true,
      synchronize: false,
      models: [User, Fitness, Trainer, Forum],
      logging: false,
    }),

    UserModule,
    FitnessModule,
    TrainerModule,
    AuthModule,
    GymsModule,
    GymsReviewsModule,
    FoodDiaryModule,
  ],
})
export class AppModule {}
