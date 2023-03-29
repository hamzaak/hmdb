import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../core/store';
import { GetMoviesResponse, fetchMovies, fetchCarouselMovies } from '../api/moviesAPI';
import { Movie } from '../models/movie';

export interface MoviesState {
  latestMovie: Movie;
  nowPlayingMovies: GetMoviesResponse;
  upcomingMovies: GetMoviesResponse;
  popularMovies: GetMoviesResponse;
  topRatedMovies: GetMoviesResponse;
  nowPlayingCarouselMoviesStatus: 'idle' | 'loading' | 'failed';
  upcomingCarouselMoviesStatus: 'idle' | 'loading' | 'failed';
  popularCarouselMoviesStatus: 'idle' | 'loading' | 'failed';
  topRatedCarouselMoviesStatus: 'idle' | 'loading' | 'failed';

  nowPlayingCarouselMovies: GetMoviesResponse;
  upcomingCarouselMovies: GetMoviesResponse;
  popularCarouselMovies: GetMoviesResponse;
  topRatedCarouselMovies: GetMoviesResponse;
  nowPlayingMoviesStatus: 'idle' | 'loading' | 'failed';
  upcomingMoviesStatus: 'idle' | 'loading' | 'failed';
  popularMoviesStatus: 'idle' | 'loading' | 'failed';
  topRatedMoviesStatus: 'idle' | 'loading' | 'failed';
}
  
const initialState: MoviesState = {
  latestMovie: { backdrop_path: '',poster_path: '', original_title: '', vote_average: 0,overview: '' },
  nowPlayingMovies: { movies: [], total_pages: 0, total_results: 0, last_page: 1 },
  upcomingMovies: { movies: [], total_pages: 0, total_results: 0, last_page: 1 },
  popularMovies: { movies: [], total_pages: 0, total_results: 0, last_page: 1 },
  topRatedMovies: { movies: [], total_pages: 0, total_results: 0, last_page: 1 },
  nowPlayingMoviesStatus: 'idle',
  upcomingMoviesStatus: 'idle',
  popularMoviesStatus: 'idle',
  topRatedMoviesStatus: 'idle',

  nowPlayingCarouselMovies: { movies: [], total_pages: 0, total_results: 0, last_page: 1 },
  upcomingCarouselMovies: { movies: [], total_pages: 0, total_results: 0, last_page: 1 },
  popularCarouselMovies: { movies: [], total_pages: 0, total_results: 0, last_page: 1 },
  topRatedCarouselMovies: { movies: [], total_pages: 0, total_results: 0, last_page: 1 },
  nowPlayingCarouselMoviesStatus: 'idle',
  upcomingCarouselMoviesStatus: 'idle',
  popularCarouselMoviesStatus: 'idle',
  topRatedCarouselMoviesStatus: 'idle'
};

export const getNowPlayingCarouselMoviesAsync = createAsyncThunk(
  'movies/fetchNowPlayingCarouselMovies',
  async () => {
    const response = await fetchCarouselMovies('now_playing');
    return response;
  }
);

export const getUpcomingCarouselMoviesAsync = createAsyncThunk(
'movies/fetchUpcomingCarouselMovies',
async () => {
  const response = await fetchCarouselMovies('upcoming');
  return response;
}
);

export const getPopularCarouselMoviesAsync = createAsyncThunk(
'movies/fetchPopularCarouselMovies',
async () => {
  const response = await fetchCarouselMovies('popular');
  return response;
}
);

export const getTopRatedCarouselMoviesAsync = createAsyncThunk(
'movies/fetchTopRateCarouseldMovies',
async () => {
  const response = await fetchCarouselMovies('top_rated');
  //console.log(response.response.movies);
  return response;
}
);

export const getNowPlayingMoviesAsync = createAsyncThunk(
    'movies/fetchNowPlayingMovies',
    async (page: number = 1) => {
      const response = await fetchMovies('now_playing', page);
      return response;
    }
);

export const getUpcomingMoviesAsync = createAsyncThunk(
  'movies/fetchUpcomingMovies',
  async (page: number = 1) => {
    const response = await fetchMovies('upcoming', page);
    return response;
  }
);

export const getPopularMoviesAsync = createAsyncThunk(
  'movies/fetchPopularMovies',
  async (page: number = 1) => {
    const response = await fetchMovies('popular', page);
    return response;
  }
);

export const getTopRatedMoviesAsync = createAsyncThunk(
  'movies/fetchTopRatedMovies',
  async (page: number = 1) => {
    const response = await fetchMovies('top_rated', page);
    return response;
  }
);

export const moviesSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: { },
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
          state.latestMovie = state.upcomingCarouselMovies.movies[Math.floor(Math.random() * state.upcomingCarouselMovies.movies.length)];
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

export const selectLatestMovie = (state: RootState) => state.movies.latestMovie;
export const selectNowPlayingMovies = (state: RootState) => state.movies.nowPlayingMovies;
export const selectNowPlayingMoviesStatus = (state: RootState) => state.movies.nowPlayingMoviesStatus;
export const selectUpcomingMovies = (state: RootState) => state.movies.upcomingMovies;
export const selectUpcomingMoviesStatus = (state: RootState) => state.movies.upcomingMoviesStatus;
export const selectPopularMovies = (state: RootState) => state.movies.popularMovies;
export const selectPopularMoviesStatus = (state: RootState) => state.movies.popularMoviesStatus;
export const selectTopRatedMovies = (state: RootState) => state.movies.topRatedMovies;
export const selectTopRatedMoviesStatus = (state: RootState) => state.movies.topRatedMoviesStatus;

export const selectNowPlayingCarouselMovies = (state: RootState) => state.movies.nowPlayingCarouselMovies;
export const selectNowPlayingCarouselMoviesStatus = (state: RootState) => state.movies.nowPlayingCarouselMoviesStatus;
export const selectUpcomingCarouselMovies = (state: RootState) => state.movies.upcomingCarouselMovies;
export const selectUpcomingCarouselMoviesStatus = (state: RootState) => state.movies.upcomingCarouselMoviesStatus;
export const selectPopularCarouselMovies = (state: RootState) => state.movies.popularCarouselMovies;
export const selectPopularCarouselMoviesStatus = (state: RootState) => state.movies.popularCarouselMoviesStatus;
export const selectTopRatedCarouselMovies = (state: RootState) => state.movies.topRatedCarouselMovies;
export const selectTopRatedCarouselMoviesStatus = (state: RootState) => state.movies.topRatedCarouselMoviesStatus;

export default moviesSlice.reducer;