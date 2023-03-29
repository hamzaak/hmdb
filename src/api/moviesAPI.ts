import axios from 'axios';
import { tmdbKey, tmdbBaseUrl } from '../config';
import { Movie } from '../models/movie';

export interface GetMoviesResponse {
    movies: Movie[];
    total_pages: number;
    total_results: number;
    last_page: number;
}

export function fetchCarouselMovies(category: string) {
    return new Promise<{ response: GetMoviesResponse }>((resolve) =>
        axios.get(`${tmdbBaseUrl}/movie/${category}?api_key=${tmdbKey}&language=en-US&page=1`)
            .then(res => {
                const movieData = res.data;
                const response = {
                    movies: movieData.results,
                    total_pages: movieData.total_pages,
                    total_results: movieData.total_results,
                    last_page: 1
                }
                setTimeout(() => resolve({ response: response }), 500);
            })
    );
};

export function fetchMovies(category: string, page: number = 1) {
    return new Promise<{ response: GetMoviesResponse }>((resolve) =>
        axios.get(`${tmdbBaseUrl}/movie/${category}?api_key=${tmdbKey}&language=en-US&page=${page}`)
            .then(res => {
                const movieData = res.data;
                const response = {
                    movies: movieData.results,
                    total_pages: movieData.total_pages,
                    total_results: movieData.total_results,
                    last_page: page + 1
                }
                setTimeout(() => resolve({ response: response }), 500);
            })
    );
};

