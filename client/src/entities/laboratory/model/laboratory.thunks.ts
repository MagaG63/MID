import { createAsyncThunk } from '@reduxjs/toolkit';
import LaboratoryService from '../api/laboratory.service';
import type { LaboratoryType } from './laboratory.type';

export const fetchLaboratories = createAsyncThunk<
  LaboratoryType[],
  void,
  { rejectValue: string }
>('laboratory/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await LaboratoryService.getAll();
  } catch (error: any) {
    console.error('Fetch laboratories error:', error);
    return rejectWithValue(error.message || 'Ошибка загрузки лабораторий');
  }
});

export const fetchLaboratoryById = createAsyncThunk<
  LaboratoryType,
  number,
  { rejectValue: string }
>('laboratory/fetchById', async (id, { rejectWithValue }) => {
  try {
    return await LaboratoryService.getById(id);
  } catch (error: any) {
    console.error('Fetch laboratory error:', error);
    return rejectWithValue(error.message || 'Ошибка загрузки лаборатории');
  }
});
