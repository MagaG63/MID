import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { LaboratoryState, LaboratoryType } from './laboratory.type';
import { fetchLaboratories } from './laboratory.thunks';

const initialState: LaboratoryState = {
  laboratories: [],
  loading: false,
  error: null,
};

export const laboratorySlice = createSlice({
  name: 'laboratory',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLaboratories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLaboratories.fulfilled, (state, action: PayloadAction<LaboratoryType[]>) => {
        state.laboratories = action.payload;
        state.loading = false;
      })
      .addCase(fetchLaboratories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLoading, setError } = laboratorySlice.actions;
export default laboratorySlice.reducer;
