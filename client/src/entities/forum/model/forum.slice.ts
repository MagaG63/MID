import { createSlice } from '@reduxjs/toolkit';
import type { ForumState } from './forum.type';
import { fetchForums } from './forum.thunks';

const initialState: ForumState = {
  forums: [],
};

export const forumsSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchForums.fulfilled, (state, action) => {
      state.forums = action.payload;
    });
  },
});

export default forumsSlice.reducer;
