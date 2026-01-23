import z from 'zod';

export const forumPageSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  author_id: z.number(),
  category_id: z.number(),
  status: z.string(),
  is_pinned: z.number(),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
});

export const forumSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  author_id: z.number(),
  category_id: z.number(),
  status: z.string(),
  is_pinned: z.number(),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
});
