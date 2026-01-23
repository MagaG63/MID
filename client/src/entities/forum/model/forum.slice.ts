import { createSlice } from '@reduxjs/toolkit';
import type { ForumState } from './forum.type';
import { fetchForums, createForumThunk, deleteForumThunk } from './forum.thunks';

const initialState: ForumState = {
  forums: [],
};

export const forumsSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchForums.fulfilled, (state, action) => {
        state.forums = action.payload;
      })
      .addCase(createForumThunk.fulfilled, (state, action) => {
        // Добавляем новый форум в начало списка
        state.forums.unshift(action.payload);
      })
      .addCase(deleteForumThunk.fulfilled, (state, action) => {
        // Удаляем форум из списка
        state.forums = state.forums.filter((forum) => forum.id !== action.payload);
      });
  },
});

export default forumsSlice.reducer;
