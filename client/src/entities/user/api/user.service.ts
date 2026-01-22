import axios from 'axios';
import { userScheme } from '../model/user.scheme';
import type { UserType, UserRegist } from '../model/user.type';
import axiosInstance, { setAccessToken } from '@/shared/api/axiosInstance';

class UserService {
  static async getUsers(): Promise<UserType[]> {
    try {
      const response = await axios.get('/api/user/all');
      return userScheme.array().parse(response.data.users);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async createUser(data: UserRegist): Promise<UserType> {
    try {
      console.log('🚀 USER REGISTER -> /api/auth/register', data);
      const response = await axiosInstance.post('/api/auth/register', data);
      return response.data.user;
    } catch (error: any) {
      console.log('🚨 CREATE ERROR FULL:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        fullResponseData: error.response?.data, // ← вот это важно!
        fullError: error,
      });
      throw error;
    }
  }

  static async loginUser(data: {
    email: string;
    password: string;
    role?: string;
  }): Promise<UserType> {
    try {
      const response = await axiosInstance.post('/api/auth/login', data);

      // ✅ СОХРАНЯЕМ ТОКЕН, ЕСЛИ ОН ЕСТЬ
      if (response.data.accessToken) {
        setAccessToken(response.data.accessToken);
      }

      const userData = response.data.user;
      return userScheme.parse(userData); // Используем parse, чтобы убедиться в данных
    } catch (error: any) {
      console.log('Login error:', error);
      throw error;
    }
  }

  static async updateUser(data: { name: string; email: string }): Promise<UserType> {
    try {
      console.log('🔄 USER UPDATE -> /api/user/profile', data);
      const response = await axiosInstance.put('/api/user/profile', data);
      return response.data.user;
    } catch (error: any) {
      console.log('🚨 UPDATE ERROR:', {
        message: error.message,
        response: error.response?.data,
      });
      throw error;
    }
  }
}

export default UserService;
