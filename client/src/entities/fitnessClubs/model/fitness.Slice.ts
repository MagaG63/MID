import { createSlice } from '@reduxjs/toolkit';
import type { FitnessState } from './fitness.Type';
import { fetchFitnessClubsThunk, getOneFitnessClubThunk } from './fitness.Thunks';

const initialState: FitnessState = {
  fitnessClubs: [],
  currentClub: null,
};

export const fitnessSlice = createSlice({
  name: 'fitness',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchFitnessClubsThunk.fulfilled, (state, action) => {
      state.fitnessClubs = action.payload;
    });
    builder
      .addCase(getOneFitnessClubThunk.fulfilled, (state, action) => {
        state.currentClub = action.payload;
      })
      .addCase(getOneFitnessClubThunk.pending, (state) => {
        state.currentClub = null;
      })
      .addCase(getOneFitnessClubThunk.rejected, (state, action) => {
        state.currentClub = null;
        console.log(action.error);
      });
  },
});

export default fitnessSlice.reducer;
