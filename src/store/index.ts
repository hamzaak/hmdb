import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import nowPlayingMoviesReducer from './movie/now-playing/reducer';
import upcomingMoviesReducer from './movie/upcoming/reducer';
import popularMoviesReducer from './movie/popular/reducer';
import topRatedMoviesReducer from './movie/top-rated/reducer';
import searchMoviesReducer from './movie/search/reducer';
import favoriteMoviesReducer from './favorites/reducer';
import movieDetailsReducer from './movie/details/reducer';
import movieCreditsReducer from './movie/credits/reducer';

export const store = configureStore({
  reducer: {
    nowPlayingMovies: nowPlayingMoviesReducer,
    upcomingMovies: upcomingMoviesReducer,
    popularMovies: popularMoviesReducer,
    topRatedMovies: topRatedMoviesReducer,
    searchMovies: searchMoviesReducer,
    favoriteMovies: favoriteMoviesReducer,
    movieDetails: movieDetailsReducer,
    movieCredits: movieCreditsReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
