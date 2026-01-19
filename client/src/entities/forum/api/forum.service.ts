import axios from 'axios';
import { forumSchema } from '../model/forum.schema';
import type { ForumType } from '../model/forum.type';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class ForumService {
  static async getForums(): Promise<ForumType[]> {
    try {
      const response = await axios.get('/api/forum/all');

      return forumSchema.array().parse(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getOne(id: number): Promise<ForumType> {
    try {
      const response = await axios.get(`/api/forum/${id.toString()}`);
      return forumSchema.parse(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
export default ForumService;
