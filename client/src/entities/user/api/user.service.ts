import axios from 'axios';
import { userScheme, userRegistSchema } from '../model/user.scheme';
import type { UserType, UserRegist } from '../model/user.type';

class UserService {
  static async createUser(data: UserRegist): Promise<UserType> {
    try {
      const response = await axios.post('/api/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      return userScheme.parse(response.data.user || response.data);
    } catch (error: any) {
      console.log('🚨 CREATE ERROR:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      throw new Error('Ошибка регистрации');
    }
  }

  static async loginUser(data: {
    email: string;
    password: string;
    role?: string;
  }): Promise<UserType> {
    try {
      console.log('🔄 LOGIN REQUEST:', data);
      const response = await axios.post('/api/auth/login', {
        email: data.email,
        password: data.password,
        role: data.role || 'user',
      });
      console.log('✅ LOGIN RESPONSE:', response.data);

      const userData = response.data.user || response.data;
      const parsed = userScheme.safeParse(userData);

      if (!parsed.success) {
        console.log('Zod parse error:', parsed.error.errors);
        return userData as UserType;
      }
      return parsed.data;
    } catch (error: any) {
      console.log('🚨 LOGIN ERROR:', error);
      throw error;
    }
  }
}

export default UserService;
