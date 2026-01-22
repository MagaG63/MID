import type z from 'zod';
import type { laboratorySchema } from './laboratory.schema';

export type LaboratoryType = z.infer<typeof laboratorySchema>;

export type LaboratoryState = {
  laboratories: LaboratoryType[];
  loading: boolean;
  error: string | null;
};
