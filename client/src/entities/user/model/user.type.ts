import type { z } from 'zod';
import type { userScheme, userRegistSchema } from './user.scheme';

export type UserType = z.infer<typeof userScheme>;
export type UserRegist = z.infer<typeof userRegistSchema>;

export type UserState = {
  user: UserType;
  users: UserType[];
};
