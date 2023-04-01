import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSearchedMovies } from '../api/movieSearchApi';
import { SearchMoviesRequest } from '../types/api/movieSearchTypes'; 

export const searchMoviesAsync = createAsyncThunk(
  'movies/searchMoviesAsync',
  async (request: SearchMoviesRequest) => {
    return await fetchSearchedMovies(request);
  }
);