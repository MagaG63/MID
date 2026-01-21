// trainer.thunk.ts - Обновленные thunks с новой функциональностью
import { createAsyncThunk } from '@reduxjs/toolkit';
import TrainerService from '../api/trainer.service';
import TrainerApi from '../api/trainer.api';
import type { TrainerType } from '../model/trainer.type';
import type {
  TrainerProfile,
  TrainerSummary,
  TrainerSearchParams,
  UpdateTrainerProfileDto,
  TrainerLoginDto,
} from '../model/trainer.interfaces';

type LoginCredentials = TrainerLoginDto;

// Аутентификация
export const loginTrainerThunk = createAsyncThunk<
  TrainerType,
  LoginCredentials,
  { rejectValue: string }
>('trainer/login', async (credentials, { rejectWithValue }) => {
  try {
    console.log('🔄 loginTrainerThunk: Попытка входа тренера', credentials.email);
    const trainer = await TrainerService.loginTrainer(credentials);
    console.log('✅ loginTrainerThunk: Успешный вход тренера', trainer);
    return trainer;
  } catch (error: any) {
    console.log('❌ loginTrainerThunk: Ошибка входа тренера:', error.message);
    return rejectWithValue(error.message || 'Ошибка входа');
  }
});

// ИСПРАВЛЕННАЯ РЕГИСТРАЦИЯ - ПРИНИМАЕТ FormData
export const registerTrainerThunk = createAsyncThunk<
  TrainerType,
  FormData,
  { rejectValue: string }
>('trainer/register', async (formData, { rejectWithValue }) => {
  try {
    console.log('📤 Регистрация тренера через thunk...');
    const trainer = await TrainerService.createTrainer(formData);
    console.log('✅ Тренер зарегистрирован:', trainer);
    return trainer;
  } catch (error: any) {
    console.error('🚨 Ошибка в thunk:', error.message);
    return rejectWithValue(error.message || 'Ошибка регистрации');
  }
});

export const logoutTrainerThunk = createAsyncThunk<void, void, { rejectValue: string }>(
  'trainer/logout',
  async (_, { rejectWithValue }) => {
    try {
      await TrainerApi.logout();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка выхода');
    }
  },
);

// Получение данных
export const fetchTrainersThunk = createAsyncThunk<
  TrainerType[],
  TrainerSearchParams | void,
  { rejectValue: string }
>('trainer/fetchAll', async (params, { rejectWithValue }) => {
  try {
    return await TrainerService.getAllTrainers();
  } catch (error: any) {
    return rejectWithValue('Ошибка загрузки тренеров');
  }
});

export const fetchTrainerByIdThunk = createAsyncThunk<
  TrainerProfile,
  number,
  { rejectValue: string }
>('trainer/fetchById', async (id, { rejectWithValue }) => {
  try {
    return await TrainerService.getTrainerById(id);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Ошибка загрузки профиля тренера');
  }
});

// Поиск и фильтрация
export const searchTrainersThunk = createAsyncThunk<
  { trainers: TrainerSummary[]; pagination: any },
  TrainerSearchParams,
  { rejectValue: string }
>('trainer/search', async (params, { rejectWithValue }) => {
  try {
    return await TrainerService.searchTrainers(params);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Ошибка поиска тренеров');
  }
});

// Управление профилем
export const updateTrainerProfileThunk = createAsyncThunk<
  TrainerProfile,
  FormData, // ИЗМЕНЕНО: принимает FormData
  { rejectValue: string }
>('trainer/updateProfile', async (formData, { rejectWithValue }) => {
  try {
    return await TrainerService.updateTrainerProfile(formData);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Ошибка обновления профиля');
  }
});

// Загрузка файлов
export const uploadProfileImageThunk = createAsyncThunk<
  { trainerId: number; fileInfo: any },
  { trainerId: number; file: File },
  { rejectValue: string }
>('trainer/uploadProfileImage', async ({ trainerId, file }, { rejectWithValue }) => {
  try {
    const fileInfo = await TrainerService.uploadProfileImage(trainerId, file);
    return { trainerId, fileInfo };
  } catch (error: any) {
    return rejectWithValue(error.message || 'Ошибка загрузки изображения профиля');
  }
});

export const uploadQualificationImagesThunk = createAsyncThunk<
  { trainerId: number; filesInfo: any[] },
  { trainerId: number; files: File[] },
  { rejectValue: string }
>('trainer/uploadQualificationImages', async ({ trainerId, files }, { rejectWithValue }) => {
  try {
    const filesInfo = await TrainerService.uploadQualificationImages(trainerId, files);
    return { trainerId, filesInfo };
  } catch (error: any) {
    return rejectWithValue(error.message || 'Ошибка загрузки изображений квалификации');
  }
});

// Получение вспомогательных данных
export const fetchSpecializationsThunk = createAsyncThunk<string[], void, { rejectValue: string }>(
  'trainer/fetchSpecializations',
  async (_, { rejectWithValue }) => {
    try {
      return await TrainerService.getAvailableSpecializations();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка загрузки специализаций');
    }
  },
);

export const fetchLocationsThunk = createAsyncThunk<string[], void, { rejectValue: string }>(
  'trainer/fetchLocations',
  async (_, { rejectWithValue }) => {
    try {
      return await TrainerService.getAvailableLocations();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка загрузки локаций');
    }
  },
);

export const fetchTrainerStatsThunk = createAsyncThunk<
  { trainerId: number; stats: any },
  number,
  { rejectValue: string }
>('trainer/fetchStats', async (trainerId, { rejectWithValue }) => {
  try {
    const stats = await TrainerService.getTrainerStats(trainerId);
    return { trainerId, stats };
  } catch (error: any) {
    return rejectWithValue(error.message || 'Ошибка загрузки статистики');
  }
});
