import { createSlice } from '@reduxjs/toolkit';
import { fetchUpcomingMovies } from './actions';
import { IUpcomingMoviesState } from './types';

const initialState: IUpcomingMoviesState = {
    page: 0,
    movies: [],  
    totalPages: 0,
    totalResults: 0,
    status: 'idle'
};

export const upcomingMoviesSlice = createSlice({
    name: 'upcomingMovies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUpcomingMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
                state.status = 'idle';
                state.page = action.payload.response.page;
                state.movies = state.movies?.concat(action.payload.response.results);
                state.totalPages = action.payload.response.total_pages;
                state.totalResults = action.payload.response.total_results;
            })
            .addCase(fetchUpcomingMovies.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default upcomingMoviesSlice.reducer;