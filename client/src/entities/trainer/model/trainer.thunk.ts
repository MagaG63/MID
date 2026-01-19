import { createAsyncThunk } from '@reduxjs/toolkit';
import TrainerService from '../api/trainer.service';
import type { TrainerType, TrainerRegist } from '../model/trainer.type';

type LoginCredentials = {
  email: string;
  password: string;
};

export const loginTrainerThunk = createAsyncThunk<
  TrainerType,
  LoginCredentials,
  { rejectValue: string }
>('trainer/login', async (credentials, { rejectWithValue }) => {
  try {
    const trainer = await TrainerService.loginTrainer(credentials);
    return trainer;
  } catch (error: any) {
    // ✅ ПЕРЕДАЕМ КОНКРЕТНУЮ ОШИБКУ
    console.log('Thunk login error:', error.message);
    return rejectWithValue(error.message);
  }
});

export const registerTrainerThunk = createAsyncThunk<
  TrainerType,
  TrainerRegist,
  { rejectValue: string }
>('trainer/register', async (data, { rejectWithValue }) => {
  try {
    return await TrainerService.createTrainer(data);
  } catch (error: any) {
    console.log('Thunk register error:', error.message);
    return rejectWithValue(error.message);
  }
});

export const fetchTrainersThunk = createAsyncThunk<TrainerType[], void, { rejectValue: string }>(
  'trainer/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await TrainerService.getAllTrainers();
    } catch (error: any) {
      return rejectWithValue('Ошибка загрузки тренеров');
    }
  },
);
