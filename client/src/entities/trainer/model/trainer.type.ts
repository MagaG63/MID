import type { z } from 'zod';
import type { trainerScheme, trainerRegistSchema } from './trainer.scheme';
import type { TrainersState, TrainerProfile, TrainerSummary } from './trainer.interfaces';

export type TrainerType = z.infer<typeof trainerScheme>;
export type TrainerRegist = z.infer<typeof trainerRegistSchema>;

// Используем новую структуру состояния
export type TrainerState = TrainersState;

// Экспортируем основные типы для обратной совместимости
export type { TrainerProfile, TrainerSummary } from './trainer.interfaces';
