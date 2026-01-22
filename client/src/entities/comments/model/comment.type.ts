import type z from 'zod';
import type { commentSchema } from './comment.schema';

export type CommentType = z.infer<typeof commentSchema>;

export type CommentState = {
  comments: CommentType[];
};

export type NewComment = {
  forum_id: number;
  author_id: number;
  content: string;
  parent_id?: number;
  likes_count?: number;
  status?: string;
};
