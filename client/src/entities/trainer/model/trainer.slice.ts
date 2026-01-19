import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { TrainerType } from './trainer.type';
import { fetchTrainersThunk, loginTrainerThunk, registerTrainerThunk } from './trainer.thunk';

export const trainerAdapter = createEntityAdapter<TrainerType>({
  selectId: (trainer) => trainer.id,
});

const initialState = trainerAdapter.getInitialState<{
  currentTrainer: TrainerType | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}>({
  currentTrainer: null,
  status: 'idle',
  error: null,
});

export const trainerSlice = createSlice({
  name: 'trainer',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentTrainer = null;
      state.status = 'idle';
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginTrainerThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginTrainerThunk.fulfilled, (state, action: PayloadAction<TrainerType>) => {
        state.currentTrainer = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(loginTrainerThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.currentTrainer = null;
      })
      // Register
      .addCase(registerTrainerThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerTrainerThunk.fulfilled, (state, action: PayloadAction<TrainerType>) => {
        state.currentTrainer = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(registerTrainerThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Fetch all
      .addCase(fetchTrainersThunk.fulfilled, (state, action: PayloadAction<TrainerType[]>) => {
        trainerAdapter.setAll(state, action.payload);
        state.status = 'succeeded';
      });
  },
});

export const { logout, clearError } = trainerSlice.actions;
export default trainerSlice.reducer;
