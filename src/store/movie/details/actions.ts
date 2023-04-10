import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMovieDetails } from '../../../services/tmdbService';

export const fetchMovieDetails = createAsyncThunk(
  'movie/fetchMovieDetails',
  async (id: string = '0') => {
    return await getMovieDetails(id);
  }
);