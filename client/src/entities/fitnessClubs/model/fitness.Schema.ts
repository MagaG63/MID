import { z } from 'zod';

export const fitnessSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string(),
  website: z.string(),
  rating: z.number(),
  priceRange: z.string(),
  workingHours: z.string(),
  image: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
