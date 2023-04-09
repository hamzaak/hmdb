import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUpcomingMovies } from '../../../services/tmdbService';

export const fetchUpcomingMovies = createAsyncThunk(
  'movie/fetchUpcomingMovies',
  async (page: number = 1) => {
    return await getUpcomingMovies(page);
  }
);