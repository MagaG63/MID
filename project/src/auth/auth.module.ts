// ✅ Связывает UserModule + TrainerModule
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { TrainerModule } from '../trainer/trainer.module';

@Module({
  imports: [UserModule, TrainerModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
