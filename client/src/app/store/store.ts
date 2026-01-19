import { configureStore } from '@reduxjs/toolkit';
import fitnessReducer from '@/entities/fitnessClubs/model/fitness.Slice';
import foodDiaryReducer from '@/entities/food-diary/model/foodDiary.Slice';

export const store = configureStore({
  reducer: { 
    fitness: fitnessReducer,
    foodDiary: foodDiaryReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
