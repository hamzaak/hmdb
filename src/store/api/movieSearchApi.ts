import axios from 'axios';
import { TMDB_API_KEY, TMDB_API_URL } from '../../config';
import { SearchMoviesRequest, SearchMoviesResponse } from '../types/api/movieSearchTypes';

export function fetchSearchedMovies(request: SearchMoviesRequest) {

    return new Promise<{ response: SearchMoviesResponse }>((resolve) => {
            axios.get(`${TMDB_API_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${request.query}&language=en-US&page=${request.page}&include_adult=false`)
                .then(res => {
                    const movieData = res.data;
                    const response = {
                        movies: movieData.results,
                        total_pages: movieData.total_pages,
                        total_results: movieData.results.length > 0 ? movieData.total_results : 0,
                        last_page: request.page + 1,
                        query: request.query,
                        prevQuery: ''
                    }

                    resolve({ response: response });
                })
        } 
    );
};