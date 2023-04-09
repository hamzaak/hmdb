import { IMovie } from "../../../types/movie";

export interface INowPlayingMoviesState {
    page: number;
    movies: Array<IMovie>;
    latestMovie: IMovie | null;
    totalPages: number;
    totalResults: number;
    status: 'idle' | 'loading' | 'failed';
}