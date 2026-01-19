import { createSlice } from '@reduxjs/toolkit';
import type { FitnessState } from './fitness.Type';
import { fetchFitnessClubsThunk } from './fitness.Thunks';

const initialState: FitnessState = {
  fitnessClubs: [],
};

export const fitnessSlice = createSlice({
  name: 'fitness',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchFitnessClubsThunk.fulfilled, (state, action) => {
      state.fitnessClubs = action.payload;
    });
  },
});

export default fitnessSlice.reducer;
