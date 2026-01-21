import { createAsyncThunk } from '@reduxjs/toolkit';
import TrainingProgramService from '../api/training-program.service';
import type { TrainingProgramType, CreateTrainingProgramData } from './training-program.type';

// Получить программы тренера
export const fetchTrainerProgramsThunk = createAsyncThunk<
  TrainingProgramType[],
  number,
  { rejectValue: string }
>('trainingProgram/fetchTrainerPrograms', async (trainerId, { rejectWithValue }) => {
  try {
    const programs = await TrainingProgramService.getByTrainerId(trainerId);
    return programs;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки программ');
  }
});

// Создать программу
export const createProgramThunk = createAsyncThunk<
  TrainingProgramType,
  CreateTrainingProgramData,
  { rejectValue: string }
>('trainingProgram/create', async (data, { rejectWithValue }) => {
  try {
    const program = await TrainingProgramService.create(data);
    return program;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Ошибка создания программы');
  }
});

// Обновить программу
export const updateProgramThunk = createAsyncThunk<
  TrainingProgramType,
  { id: number; trainerId: number; data: Partial<CreateTrainingProgramData> },
  { rejectValue: string }
>('trainingProgram/update', async ({ id, trainerId, data }, { rejectWithValue }) => {
  try {
    const program = await TrainingProgramService.update(id, trainerId, data);
    return program;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Ошибка обновления программы');
  }
});

// Удалить программу
export const deleteProgramThunk = createAsyncThunk<
  number,
  { id: number; trainerId: number },
  { rejectValue: string }
>('trainingProgram/delete', async ({ id, trainerId }, { rejectWithValue }) => {
  try {
    await TrainingProgramService.delete(id, trainerId);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Ошибка удаления программы');
  }
});
