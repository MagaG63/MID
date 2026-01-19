// ✅ Эндпоинты: /api/auth/*, /api/user/*, /api/trainer/*
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
import dotenv from 'dotenv';
import { ForumModule } from './forum/forum.module';
dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '123',
      database: process.env.DB_NAME,
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
    ForumModule,
  ],
})
export class AppModule {}
