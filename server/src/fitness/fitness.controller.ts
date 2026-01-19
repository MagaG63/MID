import { Controller, Get } from '@nestjs/common';
import { FitnessService } from './fitness.service';

@Controller('fitness')
export class FitnessController {
  constructor(private readonly fitnessService: FitnessService) {}

  @Get('all')
  findAll() {
    return this.fitnessService.getAll();
  }

  //   // Если понадобится получить один клуб
  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.fitnessService.getOne(+id);
  //   }
}
