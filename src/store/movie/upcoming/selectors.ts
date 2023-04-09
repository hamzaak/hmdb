import { RootState } from "../..";

export const selectUpcomingMoviesPage = (state: RootState) => state.upcomingMovies.page;
export const selectUpcomingMovies = (state: RootState) => state.upcomingMovies.movies;
export const selectUpcomingMoviesTotalPages = (state: RootState) => state.upcomingMovies.totalPages;
export const selectUpcomingMoviesTotalResults = (state: RootState) => state.upcomingMovies.totalResults;
export const selectUpcomingMoviesStatus = (state: RootState) => state.upcomingMovies.status;