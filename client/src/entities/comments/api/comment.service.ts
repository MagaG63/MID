import axios from 'axios';
import type { CommentType, NewComment } from '../model/comment.type';
import { commentSchema } from '../model/comment.schema';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class CommentService {
  static async getComments(): Promise<CommentType[]> {
    try {
      const response = await axios.get('/api/comment/all');
      return commentSchema.array().parse(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async addComment(data: NewComment): Promise<CommentType> {
    try {
      const response = await axios.post('/api/comment/add', data);
      return commentSchema.parse(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
export default CommentService;
