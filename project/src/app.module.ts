// ✅ Эндпоинты: /api/auth/*, /api/user/*, /api/trainer/*
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { Trainer } from './trainer/trainer.model';
import { UserModule } from './user/user.module';
import { TrainerModule } from './trainer/trainer.module';
import { AuthModule } from './auth/auth.module';
import { GymsModule } from './gyms/gyms.module';
import { GymsReviewsModule } from './gyms-reviews/gyms-reviews.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '123',
      database: 'fitne',
      autoLoadModels: true,
      synchronize: true, // Только для dev
      models: [User, Trainer],
    }),

    UserModule,
    TrainerModule,
    AuthModule,
    GymsModule,
    GymsReviewsModule,
  ],
})
export class AppModule {}
