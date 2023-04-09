import { RootState } from "../..";

export const selectTopRatedMoviesPage = (state: RootState) => state.topRatedMovies.page;
export const selectTopRatedMovies = (state: RootState) => state.topRatedMovies.movies;
export const selectTopRatedMoviesTotalPages = (state: RootState) => state.topRatedMovies.totalPages;
export const selectTopRatedMoviesTotalResults = (state: RootState) => state.topRatedMovies.totalResults;
export const selectTopRatedMoviesStatus = (state: RootState) => state.topRatedMovies.status;