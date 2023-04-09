import { createSlice } from '@reduxjs/toolkit';
import { fetchTopRatedMovies } from './actions';
import { ITopRatedMoviesState } from './types';

const initialState: ITopRatedMoviesState = {
    page: 0,
    movies: [],  
    totalPages: 0,
    totalResults: 0,
    status: 'idle'
};

export const topRatedMoviesSlice = createSlice({
    name: 'topRatedMovies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopRatedMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
                state.status = 'idle';
                state.page = action.payload.response.page;
                state.movies = state.movies?.concat(action.payload.response.results);
                state.totalPages = action.payload.response.total_pages;
                state.totalResults = action.payload.response.total_results;
            })
            .addCase(fetchTopRatedMovies.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default topRatedMoviesSlice.reducer;