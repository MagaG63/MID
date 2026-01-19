import { Controller, Get } from '@nestjs/common';
import { GymsService } from './gyms.service';

@Controller('gyms')
export class GymsController {
  constructor(private readonly gymsService: GymsService) {}
  @Get('all')
  findAll() {
    return this.gymsService.getAll();
  }
}
