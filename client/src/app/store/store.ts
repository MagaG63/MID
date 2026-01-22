import { configureStore } from '@reduxjs/toolkit';
import fitnessReducer from '@/entities/fitnessClubs/model/fitness.Slice';
import trainerReducer from '@/entities/trainer/model/trainer.slice';
import userReducer from '@/entities/user/model/user.slice';
import forumsReducer from '@/entities/forum/model/forum.slice';
import foodDiaryReducer from '@/entities/food-diary/model/foodDiary.Slice';
import { trainingProgramReducer } from '@/entities/training-program';
import commentReducer from '@/entities/comments/model/comment.slice';
import trainerReviewReducer from '@/entities/trainer-reviews/model/trainer-review.slice';
import laboratoryReducer from '@/entities/laboratory/model/laboratory.slice';

export const store = configureStore({
  reducer: {
    fitness: fitnessReducer,
    trainer: trainerReducer,
    user: userReducer,
    forums: forumsReducer,
    foodDiary: foodDiaryReducer,
    trainingProgram: trainingProgramReducer,
    comments: commentReducer,
    trainerReview: trainerReviewReducer,
    laboratory: laboratoryReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
