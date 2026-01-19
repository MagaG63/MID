import { Injectable } from '@nestjs/common';

interface DietRecommendationRequest {
  weight: number;
  height: number;
  age: number;
  goal: 'weight-loss' | 'muscle-gain' | 'recomposition';
}

@Injectable()
export class FoodDiaryService {
  // База данных продуктов (можно расширить)
  private readonly foodDatabase = {
    'греческий салат': {
      caloriesPer100g: 120,
      proteinPer100g: 3.5,
      carbsPer100g: 8.2,
      fatsPer100g: 8.5,
    },
    'куриная грудка': {
      caloriesPer100g: 165,
      proteinPer100g: 31,
      carbsPer100g: 0,
      fatsPer100g: 3.6,
    },
    'рис': {
      caloriesPer100g: 130,
      proteinPer100g: 2.7,
      carbsPer100g: 28,
      fatsPer100g: 0.3,
    },
    'овощной салат': {
      caloriesPer100g: 50,
      proteinPer100g: 1.5,
      carbsPer100g: 10,
      fatsPer100g: 0.5,
    },
    'стейк': {
      caloriesPer100g: 250,
      proteinPer100g: 26,
      carbsPer100g: 0,
      fatsPer100g: 17,
    },
    'паста': {
      caloriesPer100g: 158,
      proteinPer100g: 5.8,
      carbsPer100g: 31,
      fatsPer100g: 0.9,
    },
  };

  async recognizeFood(imageBase64: string, userId?: string) {
    // Симуляция задержки API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Простая "AI" логика - случайный выбор из базы
    const foodNames = Object.keys(this.foodDatabase);
    const randomIndex = Math.floor(Math.random() * foodNames.length);
    const recognizedFood = foodNames[randomIndex];

    // Генерируем альтернативы
    const alternatives = foodNames
      .filter((name) => name !== recognizedFood)
      .slice(0, 2)
      .map((name, index) => ({
        name,
        confidence: 0.85 - index * 0.1,
      }));

    const nutritionEstimate = this.foodDatabase[recognizedFood];

    return {
      success: true,
      foodName: recognizedFood.charAt(0).toUpperCase() + recognizedFood.slice(1),
      confidence: 0.92,
      alternatives,
      nutritionEstimate,
    };
  }

  async recommendDiet(params: DietRecommendationRequest) {
    // Симуляция задержки
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { weight, height, age, goal } = params;

    // Расчет BMR по формуле Mifflin-St Jeor (для мужчин)
    const bmr = Math.round(10 * weight + 6.25 * height - 5 * age + 5);
    const tdee = Math.round(bmr * 1.55); // умеренная активность

    let recommendedCalories = tdee;
    if (goal === 'weight-loss') {
      recommendedCalories = tdee - 500;
    } else if (goal === 'muscle-gain') {
      recommendedCalories = tdee + 300;
    }

    // Генерируем диеты в зависимости от цели
    const diets = this.generateDiets(goal, recommendedCalories);

    return {
      success: true,
      bmr,
      tdee,
      recommendedCalories,
      diets,
    };
  }

  private generateDiets(
    goal: string,
    recommendedCalories: number,
  ): Array<{
    id: string;
    name: string;
    description: string;
    dailyCalories: number;
    proteinPercent: number;
    carbsPercent: number;
    fatsPercent: number;
    suitableFor: string[];
  }> {
    const baseDiets = [
      {
        id: '1',
        name: 'Средиземноморская диета',
        description:
          'Сбалансированная диета с акцентом на овощи, рыбу, оливковое масло и цельнозерновые продукты. Идеальна для здорового похудения и поддержания сердечно-сосудистой системы.',
        dailyCalories: recommendedCalories,
        proteinPercent: 25,
        carbsPercent: 45,
        fatsPercent: 30,
        suitableFor: [goal, 'heart-health', 'general-health'],
      },
      {
        id: '2',
        name: 'Высокобелковая диета',
        description:
          'Диета с повышенным содержанием белка для сохранения и наращивания мышечной массы. Подходит для активных людей и спортсменов.',
        dailyCalories: recommendedCalories,
        proteinPercent: 35,
        carbsPercent: 35,
        fatsPercent: 30,
        suitableFor: [goal, 'muscle-building', 'athletic'],
      },
      {
        id: '3',
        name: 'Сбалансированная диета',
        description:
          'Классическое соотношение макронутриентов для здорового питания и достижения ваших целей. Универсальный подход к питанию.',
        dailyCalories: recommendedCalories,
        proteinPercent: 30,
        carbsPercent: 40,
        fatsPercent: 30,
        suitableFor: [goal, 'general-health', 'sustainable'],
      },
    ];

    // Добавляем специфичные диеты в зависимости от цели
    if (goal === 'weight-loss') {
      baseDiets.push({
        id: '4',
        name: 'Низкоуглеводная диета',
        description:
          'Диета с пониженным содержанием углеводов для ускоренного жиросжигания. Эффективна для быстрого снижения веса.',
        dailyCalories: recommendedCalories - 100,
        proteinPercent: 40,
        carbsPercent: 25,
        fatsPercent: 35,
        suitableFor: [goal, 'fast-results'],
      });
    } else if (goal === 'muscle-gain') {
      baseDiets.push({
        id: '4',
        name: 'Массонаборная диета',
        description:
          'Диета с повышенной калорийностью и высоким содержанием белка для максимального роста мышечной массы.',
        dailyCalories: recommendedCalories + 200,
        proteinPercent: 35,
        carbsPercent: 45,
        fatsPercent: 20,
        suitableFor: [goal, 'bulking', 'strength'],
      });
    }

    return baseDiets;
  }
}
