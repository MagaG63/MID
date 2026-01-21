import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TrainerReviewType } from './trainer-review.type';

interface TrainerReviewState {
  reviews: TrainerReviewType[];
  loading: boolean;
  error: string | null;
}

const initialState: TrainerReviewState = {
  reviews: [],
  loading: false,
  error: null,
};

export const trainerReviewSlice = createSlice({
  name: 'trainerReview',
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<TrainerReviewType[]>) => {
      state.reviews = action.payload;
    },
    addReview: (state, action: PayloadAction<TrainerReviewType>) => {
      state.reviews.unshift(action.payload);
    },
    updateReview: (state, action: PayloadAction<TrainerReviewType>) => {
      const index = state.reviews.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.reviews[index] = action.payload;
      }
    },
    deleteReview: (state, action: PayloadAction<number>) => {
      state.reviews = state.reviews.filter((r) => r.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setReviews,
  addReview,
  updateReview,
  deleteReview,
  setLoading,
  setError,
  clearError,
} = trainerReviewSlice.actions;

export default trainerReviewSlice.reducer;
