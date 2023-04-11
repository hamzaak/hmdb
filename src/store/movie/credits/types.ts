import { IMovieCredits } from "../../../types/movie-credits";

export interface IMovieCreditsState {
    credits: IMovieCredits | null;
    status: 'idle' | 'loading' | 'failed';
}