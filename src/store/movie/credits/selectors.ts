import { RootState } from "../..";

export const selectMovieCredits = (state: RootState) => state.movieCredits.credits;
export const selectMovieCreditsStatus = (state: RootState) => state.movieCredits.status;