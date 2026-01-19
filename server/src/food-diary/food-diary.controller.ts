import { Controller, Post, Body } from '@nestjs/common';
import { FoodDiaryService } from './food-diary.service';

interface FoodRecognitionRequest {
  image: string;
  userId?: string;
}

interface DietRecommendationRequest {
  weight: number;
  height: number;
  age: number;
  goal: 'weight-loss' | 'muscle-gain' | 'recomposition';
}

@Controller('food-diary')
export class FoodDiaryController {
  constructor(private readonly foodDiaryService: FoodDiaryService) {}

  @Post('recognize')
  async recognizeFood(@Body() body: FoodRecognitionRequest) {
    console.log('🔍 Food recognition request received');
    console.log('Image length:', body.image?.length || 0);
    console.log('User ID:', body.userId);
    
    const result = await this.foodDiaryService.recognizeFood(body.image, body.userId);
    console.log('✅ Recognition result:', result.foodName);
    
    return result;
  }

  @Post('diet-recommendations')
  async recommendDiet(@Body() body: DietRecommendationRequest) {
    return this.foodDiaryService.recommendDiet(body);
  }
}
