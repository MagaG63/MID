import { configureStore } from '@reduxjs/toolkit';
import fitnessReducer from '@/entities/fitnessClubs/model/fitness.Slice';
import forumsReducer from '@/entities/forum/model/forum.slice';
export const store = configureStore({
  reducer: { fitness: fitnessReducer, forums: forumsReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
