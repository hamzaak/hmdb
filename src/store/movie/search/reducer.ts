import { createSlice } from '@reduxjs/toolkit';
import { ISearchMoviesState } from './types';
import { fetchSearchMovies } from './actions';

const initialState: ISearchMoviesState = {
    page: 1,
    movies: [],  
    totalPages: 0,
    totalResults: 0,
    query: '',
    status: 'idle'
};

export const searchMoviesSlice = createSlice({
    name: 'searchMovies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSearchMovies.fulfilled, (state, action) => {
                state.status = 'idle';
                
                if(state.query !== action.payload.response.query) { //yeni arama yapıldı
                    state.movies = action.payload.response.results;
                    state.query = action.payload.response.query;
                } else { //yeni arama değil, yeni sayfa yüklendi
                    state.movies = state.movies.concat(action.payload.response.results);
                }
                state.totalPages = action.payload.response.total_pages;
                state.totalResults = action.payload.response.total_results;
                state.page = action.payload.response.page;
            })
            .addCase(fetchSearchMovies.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default searchMoviesSlice.reducer;