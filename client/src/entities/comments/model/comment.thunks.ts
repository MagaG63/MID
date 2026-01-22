import { createAsyncThunk } from '@reduxjs/toolkit';
import CommentService from '../api/comment.service';
import type { NewComment } from './comment.type';

export const fetchComment = createAsyncThunk('comment/fetch', async () => {
  const response = await CommentService.getComments();
  return response;
});

export const addComment = createAsyncThunk('comment/add', async (data: NewComment) => {
  const response = await CommentService.addComment(data);
  return response;
});
