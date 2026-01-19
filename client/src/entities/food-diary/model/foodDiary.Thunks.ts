import { createAsyncThunk } from '@reduxjs/toolkit';
import type { FoodRecognitionResponse, Diet, UserParameters } from './foodDiary.Type';

const convertToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      const base64Data = base64.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const recognizeFoodThunk = createAsyncThunk<
  FoodRecognitionResponse | null,
  File,
  { rejectValue: string }
>('foodDiary/recognizeFood', async (file, { rejectWithValue }) => {
  try {
    console.log('🔄 Starting food recognition...');
    console.log('File:', file.name, file.type, file.size);
    
    const base64Image = await convertToBase64(file);
    console.log('✅ Image converted to base64, length:', base64Image.length);

    // Используем собственный API
    const apiUrl = 'http://localhost:3000/api/food-diary/recognize';
    console.log('📡 Sending request to:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64Image,
        userId: 'user-123',
      }),
    });

    console.log('📥 Response status:', response.status);

    if (!response.ok) {
      console.error('❌ Response not OK:', response.statusText);
      return rejectWithValue('Сервис распознавания временно недоступен');
    }

    const data: FoodRecognitionResponse = await response.json() as FoodRecognitionResponse;
    console.log('✅ Recognition successful:', data);

    if (!data.success || !data.foodName) {
      console.error('❌ Invalid response data:', data);
      return rejectWithValue('Не удалось распознать еду');
    }

    return data;
  } catch (error) {
    console.error('❌ Food recognition error:', error);
    return rejectWithValue('Произошла ошибка при распознавании');
  }
});

export const fetchDietRecommendationsThunk = createAsyncThunk<
  Diet[],
  UserParameters,
  { rejectValue: string }
>('foodDiary/fetchDietRecommendations', async (params, { rejectWithValue }) => {
  try {
    // Используем собственный API
    const apiUrl = 'http://localhost:3000/api/food-diary/diet-recommendations';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      return rejectWithValue('Не удалось получить рекомендации');
    }

    const data = await response.json() as { diets?: Diet[] };
    return data.diets ?? [];
  } catch (error) {
    console.error('Diet recommendation error:', error);
    return rejectWithValue('Произошла ошибка при получении рекомендаций');
  }
});
