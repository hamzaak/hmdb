import { IMovie } from "../../types/movie";

export interface IFavoriteMoviesState {
    movies: IMovie[];
    status: 'idle' | 'loading' | 'failed';
}