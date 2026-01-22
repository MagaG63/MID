import { createSlice } from '@reduxjs/toolkit';
import type { CommentState } from './comment.type';
import { addComment, fetchComment } from './comment.thunks';

const initialState: CommentState = {
  comments: [],
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchComment.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
  },
});

export default commentSlice.reducer;
