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

export const createForumThunk = createAsyncThunk(
  'forum/create',
  async (data: { title: string; description: string; category_id: number }) => {
    const response = await ForumService.createForum(data);
    return response;
  },
);

export const deleteForumThunk = createAsyncThunk('forum/delete', async (id: number) => {
  await ForumService.deleteForum(id);
  return id;
});
