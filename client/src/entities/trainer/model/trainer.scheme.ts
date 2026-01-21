import { z } from 'zod';

export const trainerRegistSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
  description: z.string(),
  profileImage: z.string(),
  qualificationImages: z.array(z.string()),
});

// ✅ ДОБАВЬТЕ ЭТИ СТРОКИ
export type TrainerRegist = z.infer<typeof trainerRegistSchema>;

export const trainerScheme = z
  .object({
    id: z.number(),
    email: z.string(),
    name: z.string(),
    role: z.enum(['trainer', 'user']).optional(),
    profileImage: z.string().optional(), // Добавьте опциональные поля
    qualificationImages: z.array(z.string()).optional(),
  })
  .catchall(z.any()); // или .catchall(z.any()) вместо .loose()// ✅ Разрешаем ВСЕ остальные поля

export const trainerSignScheme = z.object({
  email: z.string(),
  password: z.string(),
});

export type TrainerType = z.infer<typeof trainerScheme>;
