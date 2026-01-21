import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TrainingProgramType } from './training-program.type';
import {
  fetchTrainerProgramsThunk,
  createProgramThunk,
  updateProgramThunk,
  deleteProgramThunk,
} from './training-program.thunks';

interface TrainingProgramState {
  programs: TrainingProgramType[];
  loading: boolean;
  error: string | null;
}

const initialState: TrainingProgramState = {
  programs: [],
  loading: false,
  error: null,
};

export const trainingProgramSlice = createSlice({
  name: 'trainingProgram',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearPrograms: (state) => {
      state.programs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch trainer programs
      .addCase(fetchTrainerProgramsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTrainerProgramsThunk.fulfilled,
        (state, action: PayloadAction<TrainingProgramType[]>) => {
          state.programs = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchTrainerProgramsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create program
      .addCase(createProgramThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createProgramThunk.fulfilled,
        (state, action: PayloadAction<TrainingProgramType>) => {
          state.programs.push(action.payload);
          state.loading = false;
        },
      )
      .addCase(createProgramThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update program
      .addCase(updateProgramThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateProgramThunk.fulfilled,
        (state, action: PayloadAction<TrainingProgramType>) => {
          const index = state.programs.findIndex((p) => p.id === action.payload.id);
          if (index !== -1) {
            state.programs[index] = action.payload;
          }
          state.loading = false;
        },
      )
      .addCase(updateProgramThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete program
      .addCase(deleteProgramThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProgramThunk.fulfilled, (state, action: PayloadAction<number>) => {
        state.programs = state.programs.filter((p) => p.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteProgramThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearPrograms } = trainingProgramSlice.actions;
export default trainingProgramSlice.reducer;
