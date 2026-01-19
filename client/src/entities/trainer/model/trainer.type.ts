import type { z } from 'zod';
import type { trainerScheme, trainerRegistSchema } from './trainer.scheme';

export type TrainerType = z.infer<typeof trainerScheme>;
export type TrainerRegist = z.infer<typeof trainerRegistSchema>; // ✅ Добавьте это

export type TrainerState = {
  trainer: TrainerType;
  trainers: TrainerType[];
};
