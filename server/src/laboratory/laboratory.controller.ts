import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { LaboratoryService, SafeLaboratoryData } from './laboratory.service';

@Controller('laboratory')
export class LaboratoryController {
  constructor(private readonly laboratoryService: LaboratoryService) {}

  // Получить все лаборатории
  @Get()
  async findAll(): Promise<{ laboratories: SafeLaboratoryData[] }> {
    const laboratories = await this.laboratoryService.findAll();
    return { laboratories };
  }

  // Получить одну лабораторию по ID
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ laboratory: SafeLaboratoryData }> {
    const laboratory = await this.laboratoryService.findOne(id);
    return { laboratory };
  }
}
