import { Controller, Post, Delete, Body, Param, Get } from '@nestjs/common';
import { GymsReviewsService } from './gyms-reviews.service';
import { type GymReviewsCreationAttributes } from './gyms-reviews.model';

@Controller('gyms-reviews')
export class GymsReviewsController {
  constructor(private readonly gymsReviewsService: GymsReviewsService) {}

  @Get('gym/:gymId')
  findByGymId(@Param('gymId') gymId: string) {
    return this.gymsReviewsService.findByGymId(+gymId);
  }

  @Post()
  create(@Body() createReviewDto: GymReviewsCreationAttributes) {
    return this.gymsReviewsService.create(createReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gymsReviewsService.remove(+id);
  }
}
