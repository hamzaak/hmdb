import { createSlice } from '@reduxjs/toolkit';
import { fetchMovieCredits } from './actions';
import { IMovieCreditsState } from './types';

const initialState: IMovieCreditsState = {
    credits: null,
    status: 'idle'
};

export const movieCreditsSlice = createSlice({
    name: 'movieCredits',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieCredits.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMovieCredits.fulfilled, (state, action) => {
                state.status = 'idle';
                state.credits = action.payload.response;
            })
            .addCase(fetchMovieCredits.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default movieCreditsSlice.reducer;