import { createAsyncThunk } from '@reduxjs/toolkit';
import FitnessService from '../api/fitness.service';

export const fetchFitnessClubsThunk = createAsyncThunk('fitness/fetch', async () => {
  const fitnessClubs = await FitnessService.getFitnessClubs();
  return fitnessClubs;
});

export const getOneFitnessClubThunk = createAsyncThunk('fitness/id', async (id: number) => {
  const fitnessClub = await FitnessService.getOneClub(id);
  return fitnessClub;
});
