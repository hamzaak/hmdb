import { createAsyncThunk } from '@reduxjs/toolkit';
import { getNowPlayingMovies } from '../../../services/tmdbService';

export const fetchNowPlayingMovies = createAsyncThunk(
  'movie/fetchNowPlayingMovies',
  async (page: number = 1) => {
    return await getNowPlayingMovies(page);
  }
);