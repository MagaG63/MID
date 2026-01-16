import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '123',
      database: 'fitnes',
      autoLoadModels: true,
      synchronize: false,
      models: [User],
      logging: false,
    }),
    UserModule,
  ],
})
export class AppModule {}
