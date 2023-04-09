import { createSlice } from '@reduxjs/toolkit';
import { fetchNowPlayingMovies } from './actions';
import { INowPlayingMoviesState } from './types';

const initialState: INowPlayingMoviesState = {
    page: 0,
    movies: [],
    latestMovie: null,    
    totalPages: 0,
    totalResults: 0,
    status: 'idle'
};

export const nowPlayingMoviesSlice = createSlice({
    name: 'nowPlayingMovies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNowPlayingMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
                state.status = 'idle';
                state.page = action.payload.response.page;
                state.movies = state.movies?.concat(action.payload.response.results);
                if(!state.latestMovie) {
                    state.latestMovie = state.movies[Math.floor(Math.random() * 20)]
                }
                state.totalPages = action.payload.response.total_pages;
                state.totalResults = action.payload.response.total_results;
            })
            .addCase(fetchNowPlayingMovies.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default nowPlayingMoviesSlice.reducer;