import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import movieListReducer from './reducers/movieListReducer';
import movieSearchReducer from './reducers/movieSearchReducer';
import movieFavoriteReducer from './reducers/movieFavoriteReducer';

export const store = configureStore({
  reducer: {
    movieList: movieListReducer,
    movieSearch: movieSearchReducer,
    movieFavorite: movieFavoriteReducer
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
