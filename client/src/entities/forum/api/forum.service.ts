import axiosInstance from '@/shared/api/axiosInstance';
import { forumSchema } from '../model/forum.schema';
import type { ForumType } from '../model/forum.type';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class ForumService {
  static async getForums(): Promise<ForumType[]> {
    try {
      const response = await axiosInstance.get('/api/forum/all');
      console.log(response.data.forums);
      return forumSchema.array().parse(response.data.forums);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getOne(id: number): Promise<ForumType> {
    try {
      const response = await axiosInstance.get(`/api/forum/${id.toString()}`);
      return forumSchema.parse(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async createForum(data: {
    title: string;
    description: string;
    category_id: number;
  }): Promise<ForumType> {
    try {
      console.log('🔵 [SERVICE] createForum вызван с данными:', data);
      const response = await axiosInstance.post('/api/forum', data);
      console.log('🔵 [SERVICE] Ответ получен:', response.data);
      return response.data.forum;
    } catch (error: any) {
      console.error('❌ [SERVICE] Ошибка создания форума:', error);
      throw new Error(error.response?.data?.message || 'Ошибка создания форума');
    }
  }

  static async deleteForum(id: number): Promise<void> {
    try {
      await axiosInstance.delete(`/api/forum/${id}`);
    } catch (error: any) {
      console.error('Ошибка удаления форума:', error);
      throw new Error(error.response?.data?.message || 'Ошибка удаления форума');
    }
  }
}
export default ForumService;
