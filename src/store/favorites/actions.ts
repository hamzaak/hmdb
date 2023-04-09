import { createAsyncThunk } from '@reduxjs/toolkit';
import { IMovie } from '../../types/movie';
import { favoriteMovie, getFavoriteMovies, isFavoriteMovie, unfavoriteMovie } from '../../services/favoriteService';

export const getFavoriteMovieAsync = createAsyncThunk(
    'movies/getFavoriteMovieAsync',
    async () => {
      return await getFavoriteMovies();
    }
  );

export const favoriteMovieAsync = createAsyncThunk(
  'movies/favoriteMovieAsync',
  async (request: IMovie) => {
    return await favoriteMovie(request);
  }
);

export const unfavoriteMovieAsync = createAsyncThunk(
    'movies/unfavoriteMovieAsync',
    async (request: IMovie) => {
      return await unfavoriteMovie(request);
    }
  );

export const isFavoriteMovieAsync = createAsyncThunk(
    'movies/isFavoriteMovieAsync',
    async (request: IMovie) => {
      return await isFavoriteMovie(request);
    }
  );

