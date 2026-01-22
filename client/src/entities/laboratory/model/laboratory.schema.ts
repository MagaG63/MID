import { z } from 'zod';

export const laboratorySchema = z.object({
  id: z.number(),
  name: z.string(),
  stated: z.string(),
  status: z.string(),
  post: z.string(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
});
