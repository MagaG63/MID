export interface FoodEntry {
  id: string;
  foodName: string;
  weight?: number;
  volume?: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  imageUrl: string;
  timestamp: Date;
}

export interface UserParameters {
  weight: number;
  height: number;
  age: number;
  goal: 'weight-loss' | 'muscle-gain' | 'recomposition';
}

export interface Diet {
  id: string;
  name: string;
  description: string;
  dailyCalories: number;
  proteinPercent: number;
  carbsPercent: number;
  fatsPercent: number;
}

export interface FoodRecognitionResponse {
  success: boolean;
  foodName: string;
  confidence: number;
  alternatives?: Array<{
    name: string;
    confidence: number;
  }>;
  nutritionEstimate?: {
    caloriesPer100g: number;
    proteinPer100g: number;
    carbsPer100g: number;
    fatsPer100g: number;
  };
}

export interface FoodDiaryState {
  foodEntries: FoodEntry[];
  userParameters: UserParameters | null;
  recommendedDiets: Diet[];
  recognizedFood: string;
  recognitionAlternatives: Array<{ name: string; confidence: number }>;
  isRecognizing: boolean;
  recognitionError: string | null;
  showDietModal: boolean;
}
