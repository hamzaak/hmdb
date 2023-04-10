import { createSlice } from '@reduxjs/toolkit';
import { fetchMovieDetails } from './actions';
import { IMovieDetailsState } from './types';

const initialState: IMovieDetailsState = {
    movieDetails: null,
    status: 'idle'
};

export const movieDetailsSlice = createSlice({
    name: 'movieDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                state.status = 'idle';
                state.movieDetails = action.payload.response;
            })
            .addCase(fetchMovieDetails.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default movieDetailsSlice.reducer;