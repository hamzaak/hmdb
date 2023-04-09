import { createSlice } from '@reduxjs/toolkit';
import { fetchPopularMovies } from './actions';
import { IPopularMoviesState } from './types';

const initialState: IPopularMoviesState = {
    page: 0,
    movies: [],  
    totalPages: 0,
    totalResults: 0,
    status: 'idle'
};

export const popularMoviesSlice = createSlice({
    name: 'popularMovies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPopularMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPopularMovies.fulfilled, (state, action) => {
                state.status = 'idle';
                state.page = action.payload.response.page;
                state.movies = state.movies?.concat(action.payload.response.results);
                state.totalPages = action.payload.response.total_pages;
                state.totalResults = action.payload.response.total_results;
            })
            .addCase(fetchPopularMovies.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default popularMoviesSlice.reducer;