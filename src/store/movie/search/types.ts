import { IMovie } from "../../../types/movie";

export interface ISearchMoviesRequest {
    page: number;
    query: string;
}

export interface ISearchMoviesState {
    page: number;
    movies: Array<IMovie>;
    totalPages: number;
    totalResults: number;
    query: string;
    status: 'idle' | 'loading' | 'failed';
}