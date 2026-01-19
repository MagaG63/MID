import { configureStore } from '@reduxjs/toolkit';
import fitnessReducer from '@/entities/fitnessClubs/model/fitness.Slice';
import trainerReducer from '@/entities/trainer/model/trainer.slice'
import userReducer from '@/entities/user/model/user.slice';

export const store = configureStore({
  reducer: { fitness: fitnessReducer,   trainer: trainerReducer,  user: userReducer, },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
