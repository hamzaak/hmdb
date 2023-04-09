import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchMovies } from '../../../services/tmdbService';
import { ISearchMoviesRequest } from './types';

export const fetchSearchMovies = createAsyncThunk(
  'movie/fetchSearchMovies',
  async (request: ISearchMoviesRequest) => {
    const response = await searchMovies(request);
    response.response.query = request.query;
    return response;
  }
);