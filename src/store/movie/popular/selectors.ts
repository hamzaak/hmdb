import { RootState } from "../..";

export const selectPopularMoviesPage = (state: RootState) => state.popularMovies.page;
export const selectPopularMovies = (state: RootState) => state.popularMovies.movies;
export const selectPopularMoviesTotalPages = (state: RootState) => state.popularMovies.totalPages;
export const selectPopularMoviesTotalResults = (state: RootState) => state.popularMovies.totalResults;
export const selectPopularMoviesStatus = (state: RootState) => state.popularMovies.status;