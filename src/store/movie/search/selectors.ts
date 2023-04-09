import { RootState } from "../..";

export const selectSearchMoviesPage = (state: RootState) => state.searchMovies.page;
export const selectSearchMovies = (state: RootState) => state.searchMovies.movies;
export const selectSearchMoviesTotalPages = (state: RootState) => state.searchMovies.totalPages;
export const selectSearchMoviesTotalResults = (state: RootState) => state.searchMovies.totalResults;
export const selectSearchMoviesQuery = (state: RootState) => state.searchMovies.query;
export const selectSearchMoviesStatus = (state: RootState) => state.searchMovies.status;