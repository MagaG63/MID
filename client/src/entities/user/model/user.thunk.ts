import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../api/user.service';
import type { UserType, UserRegist } from './user.type';

type LoginCredentials = {
  email: string;
  password: string;
  role?: string;
};

export const loginUserThunk = createAsyncThunk<UserType, LoginCredentials, { rejectValue: string }>(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const user = await UserService.loginUser(credentials);
      return user;
    } catch (error: any) {
      console.log('Thunk login error:', error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const registerUserThunk = createAsyncThunk<UserType, UserRegist, { rejectValue: string }>(
  'user/register',
  async (data, { rejectWithValue }) => {
    try {
      return await UserService.createUser(data);
    } catch (error: any) {
      console.log('Thunk register error:', error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const updateUserThunk = createAsyncThunk<
  UserType,
  { name: string; email: string },
  { rejectValue: string }
>('user/update', async (data, { rejectWithValue }) => {
  try {
    return await UserService.updateUser(data);
  } catch (error: any) {
    console.log('Thunk update error:', error.message);
    return rejectWithValue(error.message);
  }
});
