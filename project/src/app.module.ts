import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { Fitness } from './fitness/fitness.model';
import { FitnessModule } from './fitness/fitness.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'fitnes',
      autoLoadModels: true,
      synchronize: false,
      models: [User, Fitness],
      logging: false,
    }),
    UserModule,
    FitnessModule,
  ],
})
export class AppModule {}
