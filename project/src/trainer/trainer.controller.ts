import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TrainerService } from './trainer.service'; // ✅ ЛОКАЛЬНЫЙ ИМПОРТ

@Controller('trainer')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {} // ✅ Теперь работает

  @Get('all')
  findAll() {
    return this.trainerService.getAll();
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  create(@Body() dto: any) {
    return this.trainerService.create(dto);
  }
}
