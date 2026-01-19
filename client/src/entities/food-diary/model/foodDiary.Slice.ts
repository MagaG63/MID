import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FoodDiaryState, FoodEntry, UserParameters, Diet } from './foodDiary.Type';
import { recognizeFoodThunk, fetchDietRecommendationsThunk } from './foodDiary.Thunks';

const initialState: FoodDiaryState = {
  foodEntries: [],
  userParameters: null,
  recommendedDiets: [],
  recognizedFood: '',
  recognitionAlternatives: [],
  isRecognizing: false,
  recognitionError: null,
  showDietModal: false,
};

const foodDiarySlice = createSlice({
  name: 'foodDiary',
  initialState,
  reducers: {
    addFoodEntry: (state, action: PayloadAction<FoodEntry>) => {
      state.foodEntries.push(action.payload);
    },
    setUserParameters: (state, action: PayloadAction<UserParameters>) => {
      state.userParameters = action.payload;
    },
    setRecognizedFood: (state, action: PayloadAction<string>) => {
      state.recognizedFood = action.payload;
    },
    clearRecognizedFood: (state) => {
      state.recognizedFood = '';
      state.recognitionAlternatives = [];
    },
    setShowDietModal: (state, action: PayloadAction<boolean>) => {
      state.showDietModal = action.payload;
    },
    clearRecognitionError: (state) => {
      state.recognitionError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Recognize Food
      .addCase(recognizeFoodThunk.pending, (state) => {
        state.isRecognizing = true;
        state.recognitionError = null;
      })
      .addCase(recognizeFoodThunk.fulfilled, (state, action) => {
        state.isRecognizing = false;
        if (action.payload) {
          state.recognizedFood = action.payload.foodName;
          state.recognitionAlternatives = action.payload.alternatives || [];
        }
      })
      .addCase(recognizeFoodThunk.rejected, (state, action) => {
        state.isRecognizing = false;
        state.recognitionError = action.payload as string;
      })
      // Fetch Diet Recommendations
      .addCase(fetchDietRecommendationsThunk.fulfilled, (state, action) => {
        state.recommendedDiets = action.payload;
      });
  },
});

export const {
  addFoodEntry,
  setUserParameters,
  setRecognizedFood,
  clearRecognizedFood,
  setShowDietModal,
  clearRecognitionError,
} = foodDiarySlice.actions;

export default foodDiarySlice.reducer;
