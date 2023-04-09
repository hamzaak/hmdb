import { RootState } from "../..";

export const selectNowPlayingMoviesPage = (state: RootState) => state.nowPlayingMovies.page;
export const selectNowPlayingMovies = (state: RootState) => state.nowPlayingMovies.movies;
export const selectNowPlayingMoviesLatestMovie = (state: RootState) => state.nowPlayingMovies.latestMovie;
export const selectNowPlayingMoviesTotalPages = (state: RootState) => state.nowPlayingMovies.totalPages;
export const selectNowPlayingMoviesTotalResults = (state: RootState) => state.nowPlayingMovies.totalResults;
export const selectNowPlayingMoviesStatus = (state: RootState) => state.nowPlayingMovies.status;