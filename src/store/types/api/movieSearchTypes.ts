import { IMovie } from "../movie";

export interface SearchMoviesRequest {
    query: string;
    page: number;
}

export interface SearchMoviesResponse {
    movies: IMovie[];
    total_pages: number;
    total_results: number;
    last_page: number;
    query: string;
}