import z from 'zod';

export const forumPageSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  author_id: z.number(),
  likes: z.number().nullable(),
  comments: z.number().nullable(),
});

export const forumSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  author_id: z.number(),
});
