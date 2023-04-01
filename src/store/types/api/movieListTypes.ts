import { IMovie } from "../movie";

export interface GetMoviesResponse {
    movies: IMovie[];
    total_pages: number;
    total_results: number;
    last_page: number;
}
