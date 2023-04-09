import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPopularMovies } from '../../../services/tmdbService';

export const fetchPopularMovies = createAsyncThunk(
  'movie/fetchPopularMovies',
  async (page: number = 1) => {
    return await getPopularMovies(page);
  }
);