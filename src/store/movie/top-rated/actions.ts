import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTopRatedMovies } from '../../../services/tmdbService';

export const fetchTopRatedMovies = createAsyncThunk(
  'movie/fetchTopRatedMovies',
  async (page: number = 1) => {
    return await getTopRatedMovies(page);
  }
);