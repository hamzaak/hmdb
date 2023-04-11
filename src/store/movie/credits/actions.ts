import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMovieCredits } from '../../../services/tmdbService';

export const fetchMovieCredits = createAsyncThunk(
  'movie/fetchMovieCredits',
  async (id: string = '0') => {
    return await getMovieCredits(id);
  }
);