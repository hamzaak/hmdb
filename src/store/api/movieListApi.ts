import axios from 'axios';
import { TMDB_API_KEY, TMDB_API_URL } from '../../config';
import { GetMoviesResponse } from '../types/api/movieListTypes';
import { IMovie } from '../types/movie';

export function fetchCarouselMovies(category: string) {
    return new Promise<{ response: IMovie[] }>((resolve) =>
        axios.get(`${TMDB_API_URL}/movie/${category}?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
            .then(res => {
                const response = res.data.results;
                resolve({ response: response });
            })
    );
};

export function fetchMovies(category: string, page: number = 1) {
    return new Promise<{ response: GetMoviesResponse }>((resolve) =>
        axios.get(`${TMDB_API_URL}/movie/${category}?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`)
            .then(res => {
                const movieData = res.data;
                const response = {
                    movies: movieData.results,
                    total_pages: movieData.total_pages,
                    total_results: movieData.total_results,
                    last_page: page + 1
                }
                resolve({ response: response });
            })
    );
};

