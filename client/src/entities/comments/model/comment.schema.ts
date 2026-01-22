import z from 'zod';

export const commentSchema = z.object({
  id: z.number(),
  forum_id: z.number(),
  author_id: z.number(),
  content: z.string(),
  parent_id: z.number().nullable(),
  likes_count: z.number(),
  status: z.string(),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
});
