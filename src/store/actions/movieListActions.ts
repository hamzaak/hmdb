import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMovies, fetchCarouselMovies } from '../api/movieListApi';

export const getNowPlayingCarouselMoviesAsync = createAsyncThunk(
  'movies/getNowPlayingCarouselMoviesAsync',
  async () => {
    const response = await fetchCarouselMovies('now_playing');
    return response;
  }
);

export const getUpcomingCarouselMoviesAsync = createAsyncThunk(
  'movies/getUpcomingCarouselMoviesAsync',
  async () => {
    const response = await fetchCarouselMovies('upcoming');
    return response;
  }
);

export const getPopularCarouselMoviesAsync = createAsyncThunk(
  'movies/getPopularCarouselMoviesAsync',
  async () => {
    const response = await fetchCarouselMovies('popular');
    return response;
  }
);

export const getTopRatedCarouselMoviesAsync = createAsyncThunk(
  'movies/getTopRatedCarouselMoviesAsync',
  async () => {
    const response = await fetchCarouselMovies('top_rated');
    return response;
  }
);

export const getNowPlayingMoviesAsync = createAsyncThunk(
  'movies/getNowPlayingMoviesAsync',
  async (page: number = 1) => {
    const response = await fetchMovies('now_playing', page);
    return response;
  }
);

export const getUpcomingMoviesAsync = createAsyncThunk(
  'movies/getUpcomingMoviesAsync',
  async (page: number = 1) => {
    const response = await fetchMovies('upcoming', page);
    return response;
  }
);

export const getPopularMoviesAsync = createAsyncThunk(
  'movies/getPopularMoviesAsync',
  async (page: number = 1) => {
    const response = await fetchMovies('popular', page);
    return response;
  }
);

export const getTopRatedMoviesAsync = createAsyncThunk(
  'movies/getTopRatedMoviesAsync',
  async (page: number = 1) => {
    const response = await fetchMovies('top_rated', page);
    return response;
  }
);