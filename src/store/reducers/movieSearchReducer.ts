import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { searchMoviesAsync } from '../actions/movieSearchActions';
import { SearchMoviesResponse } from '../types/api/movieSearchTypes';

export interface MovieSearchState {
    response: SearchMoviesResponse;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: MovieSearchState = {
    response: { 
        movies: [], 
        total_pages: 0, 
        total_results: 0, 
        last_page: 1, 
        query: ''
    },
    status: 'idle'
};

export const movieSearchSlice = createSlice({
    name: 'movieSearch',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchMoviesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchMoviesAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(state.response.query !== action.payload.response.query) { //yeni arama yapıldı
                    state.response.movies = action.payload.response.movies;
                    state.response.query = action.payload.response.query;
                } else { //yeni arama değil, yeni sayfa yüklendi
                    state.response.movies = state.response.movies.concat(action.payload.response.movies);
                }
                state.response.total_pages = action.payload.response.total_pages;
                state.response.total_results = action.payload.response.total_results;
                state.response.last_page = action.payload.response.last_page;
            })
            .addCase(searchMoviesAsync.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const selectSearchResult = (state: RootState) => state.movieSearch.response;
export const selectSearchResultStatus = (state: RootState) => state.movieSearch.status;

export default movieSearchSlice.reducer;