import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { GetMoviesResponse } from '../types/api/movieListTypes';
import { IMovie } from '../types/movie';
import {
  getNowPlayingMoviesAsync, getNowPlayingCarouselMoviesAsync,
  getUpcomingMoviesAsync, getUpcomingCarouselMoviesAsync,
  getPopularMoviesAsync, getPopularCarouselMoviesAsync,
  getTopRatedMoviesAsync, getTopRatedCarouselMoviesAsync
} from '../actions/movieListActions';

export interface MoviesState {
  latestMovie: IMovie;
  nowPlayingMovies: GetMoviesResponse;
  upcomingMovies: GetMoviesResponse;
  popularMovies: GetMoviesResponse;
  topRatedMovies: GetMoviesResponse;
  nowPlayingCarouselMoviesStatus: 'idle' | 'loading' | 'failed';
  upcomingCarouselMoviesStatus: 'idle' | 'loading' | 'failed';
  popularCarouselMoviesStatus: 'idle' | 'loading' | 'failed';
  topRatedCarouselMoviesStatus: 'idle' | 'loading' | 'failed';

  nowPlayingCarouselMovies: IMovie[];
  upcomingCarouselMovies: IMovie[];
  popularCarouselMovies: IMovie[];
  topRatedCarouselMovies: IMovie[];
  nowPlayingMoviesStatus: 'idle' | 'loading' | 'failed';
  upcomingMoviesStatus: 'idle' | 'loading' | 'failed';
  popularMoviesStatus: 'idle' | 'loading' | 'failed';
  topRatedMoviesStatus: 'idle' | 'loading' | 'failed';
}

const initialState: MoviesState = {
  latestMovie: {id: 0, backdrop_path: '', poster_path: '', original_title: '', vote_average: 0, overview: '' },
  nowPlayingMovies: { movies: [], total_pages: 0, total_results: 0, last_page: 1 },
  upcomingMovies: { movies: [], total_pages: 0, total_results: 0, last_page: 1 },
  popularMovies: { movies: [], total_pages: 0, total_results: 0, last_page: 1 },
  topRatedMovies: { movies: [], total_pages: 0, total_results: 0, last_page: 1 },
  nowPlayingMoviesStatus: 'idle',
  upcomingMoviesStatus: 'idle',
  popularMoviesStatus: 'idle',
  topRatedMoviesStatus: 'idle',

  nowPlayingCarouselMovies: [],
  upcomingCarouselMovies: [],
  popularCarouselMovies: [],
  topRatedCarouselMovies: [],
  nowPlayingCarouselMoviesStatus: 'idle',
  upcomingCarouselMoviesStatus: 'idle',
  popularCarouselMoviesStatus: 'idle',
  topRatedCarouselMoviesStatus: 'idle'
};

export const movieListSlice = createSlice({
  name: 'movieList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNowPlayingCarouselMoviesAsync.pending, (state) => {
        state.nowPlayingCarouselMoviesStatus = 'loading';
      })
      .addCase(getNowPlayingCarouselMoviesAsync.fulfilled, (state, action) => {
        state.nowPlayingCarouselMoviesStatus = 'idle';
        state.nowPlayingCarouselMovies = action.payload.response;
      })
      .addCase(getNowPlayingCarouselMoviesAsync.rejected, (state) => {
        state.nowPlayingCarouselMoviesStatus = 'failed';
      })
      .addCase(getUpcomingCarouselMoviesAsync.pending, (state) => {
        state.upcomingCarouselMoviesStatus = 'loading';
      })
      .addCase(getUpcomingCarouselMoviesAsync.fulfilled, (state, action) => {
        state.upcomingCarouselMoviesStatus = 'idle';
        state.upcomingCarouselMovies = action.payload.response;
        state.latestMovie = state.upcomingCarouselMovies[Math.floor(Math.random() * state.upcomingCarouselMovies.length)];
      })
      .addCase(getUpcomingCarouselMoviesAsync.rejected, (state) => {
        state.upcomingCarouselMoviesStatus = 'failed';
      })
      .addCase(getPopularCarouselMoviesAsync.pending, (state) => {
        state.popularCarouselMoviesStatus = 'loading';
      })
      .addCase(getPopularCarouselMoviesAsync.fulfilled, (state, action) => {
        state.popularCarouselMoviesStatus = 'idle';
        state.popularCarouselMovies = action.payload.response;
      })
      .addCase(getPopularCarouselMoviesAsync.rejected, (state) => {
        state.popularCarouselMoviesStatus = 'failed';
      })
      .addCase(getTopRatedCarouselMoviesAsync.pending, (state) => {
        state.topRatedCarouselMoviesStatus = 'loading';
      })
      .addCase(getTopRatedCarouselMoviesAsync.fulfilled, (state, action) => {
        state.topRatedCarouselMoviesStatus = 'idle';
        state.topRatedCarouselMovies = action.payload.response;
      })
      .addCase(getTopRatedCarouselMoviesAsync.rejected, (state) => {
        state.topRatedCarouselMoviesStatus = 'failed';
      })
      //
      .addCase(getNowPlayingMoviesAsync.pending, (state) => {
        state.nowPlayingMoviesStatus = 'loading';
      })
      .addCase(getNowPlayingMoviesAsync.fulfilled, (state, action) => {
        state.nowPlayingMoviesStatus = 'idle';
        state.nowPlayingMovies.movies = state.nowPlayingMovies.movies.concat(action.payload.response.movies);
        state.nowPlayingMovies.total_pages = action.payload.response.total_pages;
        state.nowPlayingMovies.total_results = action.payload.response.total_results;
        state.nowPlayingMovies.last_page = action.payload.response.last_page;
      })
      .addCase(getNowPlayingMoviesAsync.rejected, (state) => {
        state.nowPlayingMoviesStatus = 'failed';
      })
      .addCase(getUpcomingMoviesAsync.pending, (state) => {
        state.upcomingMoviesStatus = 'loading';
      })
      .addCase(getUpcomingMoviesAsync.fulfilled, (state, action) => {
        state.upcomingMoviesStatus = 'idle';
        state.upcomingMovies.movies = state.upcomingMovies.movies.concat(action.payload.response.movies);
        state.upcomingMovies.total_pages = action.payload.response.total_pages;
        state.upcomingMovies.total_results = action.payload.response.total_results;
        state.upcomingMovies.last_page = action.payload.response.last_page;
      })
      .addCase(getUpcomingMoviesAsync.rejected, (state) => {
        state.upcomingMoviesStatus = 'failed';
      })
      .addCase(getPopularMoviesAsync.pending, (state) => {
        state.popularMoviesStatus = 'loading';
      })
      .addCase(getPopularMoviesAsync.fulfilled, (state, action) => {
        state.popularMoviesStatus = 'idle';
        state.popularMovies.movies = state.popularMovies.movies.concat(action.payload.response.movies);
        state.popularMovies.total_pages = action.payload.response.total_pages;
        state.popularMovies.total_results = action.payload.response.total_results;
        state.popularMovies.last_page = action.payload.response.last_page;
      })
      .addCase(getPopularMoviesAsync.rejected, (state) => {
        state.popularMoviesStatus = 'failed';
      })
      .addCase(getTopRatedMoviesAsync.pending, (state) => {
        state.topRatedMoviesStatus = 'loading';
      })
      .addCase(getTopRatedMoviesAsync.fulfilled, (state, action) => {
        state.topRatedMoviesStatus = 'idle';
        state.topRatedMovies.movies = state.topRatedMovies.movies.concat(action.payload.response.movies);
        state.topRatedMovies.total_pages = action.payload.response.total_pages;
        state.topRatedMovies.total_results = action.payload.response.total_results;
        state.topRatedMovies.last_page = action.payload.response.last_page;
      })
      .addCase(getTopRatedMoviesAsync.rejected, (state) => {
        state.topRatedMoviesStatus = 'failed';
      });
  },
});

//export const { } = moviesSlice.actions;

export const selectLatestMovie = (state: RootState) => state.movieList.latestMovie;
export const selectNowPlayingMovies = (state: RootState) => state.movieList.nowPlayingMovies;
export const selectNowPlayingMoviesStatus = (state: RootState) => state.movieList.nowPlayingMoviesStatus;
export const selectUpcomingMovies = (state: RootState) => state.movieList.upcomingMovies;
export const selectUpcomingMoviesStatus = (state: RootState) => state.movieList.upcomingMoviesStatus;
export const selectPopularMovies = (state: RootState) => state.movieList.popularMovies;
export const selectPopularMoviesStatus = (state: RootState) => state.movieList.popularMoviesStatus;
export const selectTopRatedMovies = (state: RootState) => state.movieList.topRatedMovies;
export const selectTopRatedMoviesStatus = (state: RootState) => state.movieList.topRatedMoviesStatus;

export const selectNowPlayingCarouselMovies = (state: RootState) => state.movieList.nowPlayingCarouselMovies;
export const selectNowPlayingCarouselMoviesStatus = (state: RootState) => state.movieList.nowPlayingCarouselMoviesStatus;
export const selectUpcomingCarouselMovies = (state: RootState) => state.movieList.upcomingCarouselMovies;
export const selectUpcomingCarouselMoviesStatus = (state: RootState) => state.movieList.upcomingCarouselMoviesStatus;
export const selectPopularCarouselMovies = (state: RootState) => state.movieList.popularCarouselMovies;
export const selectPopularCarouselMoviesStatus = (state: RootState) => state.movieList.popularCarouselMoviesStatus;
export const selectTopRatedCarouselMovies = (state: RootState) => state.movieList.topRatedCarouselMovies;
export const selectTopRatedCarouselMoviesStatus = (state: RootState) => state.movieList.topRatedCarouselMoviesStatus;

export default movieListSlice.reducer;