import axios from 'axios';
import { TMDB_API_KEY, TMDB_API_URL } from '../config';
import { IMovie } from '../types/movie';
import { ISearch } from '../types/search';
import { ISearchMoviesRequest } from '../store/movie/search/types';
import { IMovieDetails } from '../types/movie-details';
import { IMovieCredits } from '../types/movie-credits';

export function getLatestMovie(id: number) {
    return new Promise<{ response: IMovie }>((resolve) => {
            axios.get(`${TMDB_API_URL}/movie/latest?api_key=${TMDB_API_KEY}&language=en-US&include_adult=false`)
                .then(res => { resolve({ response: res.data }); })
        } 
    );
};

export function getNowPlayingMovies(page: number) {
    return new Promise<{ response: ISearch<IMovie> }>((resolve) => {
            axios.get(`${TMDB_API_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`)
                .then(res => { resolve({ response: res.data }); })
        } 
    );
};

export function getUpcomingMovies(page: number) {
    return new Promise<{ response: ISearch<IMovie> }>((resolve) => {
            axios.get(`${TMDB_API_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`)
                .then(res => { resolve({ response: res.data }); })
        } 
    );
};

export function getPopularMovies(page: number) {
    return new Promise<{ response: ISearch<IMovie> }>((resolve) => {
            axios.get(`${TMDB_API_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`)
                .then(res => { resolve({ response: res.data }); })
        } 
    );
};

export function getTopRatedMovies(page: number) {
    return new Promise<{ response: ISearch<IMovie> }>((resolve) => {
            axios.get(`${TMDB_API_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`)
                .then(res => { resolve({ response: res.data }); })
        } 
    );
};

export function searchMovies(request: ISearchMoviesRequest) {
    return new Promise<{ response: ISearch<IMovie> }>((resolve) => {
        axios.get(`${TMDB_API_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${request.query}&language=en-US&page=${request.page}&include_adult=false`)
            .then(res => { resolve({ response: res.data }); })
        } 
    );
};

export function getMovieDetails(id: string) {
    return new Promise<{ response: IMovieDetails }>((resolve) => {
        axios.get(`${TMDB_API_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`)
            .then(res => { resolve({ response: res.data }); })
        } 
    );
};

export function getMovieCredits(id: string) {
    return new Promise<{ response: IMovieCredits }>((resolve) => {
        axios.get(`${TMDB_API_URL}/movie/${id}/credits?api_key=${TMDB_API_KEY}&language=en-US`)
            .then(res => { resolve({ response: res.data }); })
        } 
    );
};
