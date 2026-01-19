import { z } from 'zod';

export const userRegistSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export type UserRegist = z.infer<typeof userRegistSchema>;

export const userScheme = z
  .object({
    id: z.number(),
    email: z.string(),
    name: z.string(),
    role: z.enum(['user', 'trainer']).optional(),
  })
  .loose();

export const userSignScheme = z.object({
  email: z.string(),
  password: z.string(),
});

export type UserType = z.infer<typeof userScheme>;
