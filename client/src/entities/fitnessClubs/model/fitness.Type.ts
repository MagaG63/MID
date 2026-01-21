import type z from 'zod';
import type { fitnessSchema } from './fitness.Schema';

export type FitnessType = z.infer<typeof fitnessSchema>;

export type FitnessState = {
  fitnessClubs: FitnessType[];
  currentClub: FitnessType | null;
};
