import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getFavoriteMovieAsync, favoriteMovieAsync, unfavoriteMovieAsync } from '../actions/movieFavoriteActions'; 
import { IMovie } from '../types/movie';

export interface MovieFavoriteState {
    movies: IMovie[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: MovieFavoriteState = {
    movies: [],
    status: 'idle'
};

export const movieFavoriteSlice = createSlice({
    name: 'movieSearch',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
            builder
            .addCase(getFavoriteMovieAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getFavoriteMovieAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.movies = action.payload.response;
            })
            .addCase(getFavoriteMovieAsync.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(favoriteMovieAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(favoriteMovieAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.movies = action.payload.response;
            })
            .addCase(favoriteMovieAsync.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(unfavoriteMovieAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(unfavoriteMovieAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.movies = action.payload.response;
            })
            .addCase(unfavoriteMovieAsync.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const selectFavoriteMovies = (state: RootState) => state.movieFavorite.movies;
export const selectFavoriteMoviesStatus = (state: RootState) => state.movieFavorite.status;

export default movieFavoriteSlice.reducer;