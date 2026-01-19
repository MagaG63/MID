import { createAsyncThunk } from '@reduxjs/toolkit';
import ForumService from '../api/forum.service';

export const fetchForums = createAsyncThunk('forum/fetch', async () => {
  const response = await ForumService.getForums();
  return response;
});

export const findOneForum = createAsyncThunk('forum/id', async (id: number) => {
  const response = await ForumService.getOne(id);
  return response;
});
