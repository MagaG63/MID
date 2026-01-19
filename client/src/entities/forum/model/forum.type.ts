import type z from 'zod';
import type { forumSchema } from './forum.schema';

export type ForumType = z.infer<typeof forumSchema>;

export type ForumState = {
  forums: ForumType[];
};
