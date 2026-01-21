import { Controller, Get, Param } from '@nestjs/common';
import { FitnessService } from './fitness.service';

@Controller('fitness')
export class FitnessController {
  constructor(private readonly fitnessService: FitnessService) {}

  @Get('all')
  findAll() {
    return this.fitnessService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fitnessService.getOne(+id);
  }
}
