import { createAsyncThunk } from '@reduxjs/toolkit';
import FitnessService from '../api/fitness.service';

export const fetchFitnessClubsThunk = createAsyncThunk('fitness/fetch', async () => {
  const fitnessClubs = await FitnessService.getFitnessClubs();
  return fitnessClubs;
});
