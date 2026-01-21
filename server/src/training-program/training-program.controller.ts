// training-program/training-program.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TrainingProgramService, SafeTrainingProgramData } from './training-program.service';
import { CreateTrainingProgramDto } from './dto/create-training-program.dto';
import { UpdateTrainingProgramDto } from './dto/update-training-program.dto';

@Controller('training-program')
export class TrainingProgramController {
  constructor(private readonly trainingProgramService: TrainingProgramService) {}

  // Создание программы тренировок
  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createDto: CreateTrainingProgramDto,
  ): Promise<{ program: SafeTrainingProgramData }> {
    const program = await this.trainingProgramService.create(createDto);
    return { program };
  }

  // Получение всех программ
  @Get()
  async findAll(): Promise<{ programs: SafeTrainingProgramData[] }> {
    const programs = await this.trainingProgramService.findAll();
    return { programs };
  }

  // Получение программ конкретного тренера
  @Get('trainer/:trainerId')
  async findByTrainerId(
    @Param('trainerId', ParseIntPipe) trainerId: number,
  ): Promise<{ programs: SafeTrainingProgramData[] }> {
    const programs = await this.trainingProgramService.findByTrainerId(trainerId);
    return { programs };
  }

  // Получение одной программы по ID
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ program: SafeTrainingProgramData }> {
    const program = await this.trainingProgramService.findOne(id);
    return { program };
  }

  // Обновление программы
  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateTrainingProgramDto & { trainerId: number },
  ): Promise<{ program: SafeTrainingProgramData }> {
    const program = await this.trainingProgramService.update(
      id,
      updateDto.trainerId,
      updateDto,
    );
    return { program };
  }

  // Удаление программы
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Body('trainerId', ParseIntPipe) trainerId: number,
  ): Promise<{ message: string }> {
    await this.trainingProgramService.remove(id, trainerId);
    return { message: 'Программа тренировок успешно удалена' };
  }
}
