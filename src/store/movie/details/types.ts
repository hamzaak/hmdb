import { IMovieDetails } from "../../../types/movie-details";

export interface IMovieDetailsState {
    movieDetails: IMovieDetails | null;
    status: 'idle' | 'loading' | 'failed';
}