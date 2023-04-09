import { IMovie } from "../../../types/movie";

export interface IUpcomingMoviesState {
    page: number;
    movies: Array<IMovie>;
    totalPages: number;
    totalResults: number;
    status: 'idle' | 'loading' | 'failed';
}