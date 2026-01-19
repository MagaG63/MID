import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { UserType } from './user.type';
import { loginUserThunk, registerUserThunk } from './user.thunk';

export const userAdapter = createEntityAdapter<UserType>({
  selectId: (user) => user.id,
});

const initialState = userAdapter.getInitialState<{
  currentUser: UserType | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}>({
  currentUser: null,
  status: 'idle',
  error: null,
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
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
      .addCase(loginUserThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.currentUser = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.currentUser = null;
      })
      // Register
      .addCase(registerUserThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.currentUser = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;
