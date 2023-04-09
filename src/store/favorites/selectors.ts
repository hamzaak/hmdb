import { RootState } from "..";

export const selectFavoriteMovies = (state: RootState) => state.favoriteMovies.movies;
export const selectFavoriteMoviesStatus = (state: RootState) => state.favoriteMovies.status;
