import React from 'react';
import axios from 'axios';
import { Text, Grid, Stack, Title, Button, Loader } from "@mantine/core";
import { tmdbKey, tmdbBaseUrl } from '../config';
import { Movie } from '../models/movie';
import MovieListItem from './movieListItem';

interface IMovieListProps {
    title: string;
    movieType: string;
}

interface IMovieListState {
    movies: Movie[];
    loading: boolean;
    total_pages: number;
    total_results: number;
    current_page: number;
}

export default class MovieList extends React.Component<IMovieListProps, IMovieListState> {
    constructor(props: IMovieListProps) {
        super(props);
    
        this.state = {
            movies: [],
            loading: true,
            total_pages: 0,
            total_results: 0,
            current_page: 1
        };

        //bu kod satırı olmazsa button state değerini değiştiremez!
        this.loadMoreClick = this.loadMoreClick.bind(this);
    }

    componentDidMount() {
        this.fetchMovies(1);
    }

    fetchMovies(page: number) {
        this.setState({loading: true});
        axios.get(`${tmdbBaseUrl}/movie/${this.props.movieType}?api_key=${tmdbKey}&language=en-US&page=${page}`)
            .then(res => {
                const movieData = res.data;
                const movies = movieData.results;
                const totalPages = movieData.total_pages;
                const totalResults = movieData.total_results;
                const currentMovies: Movie[] = this.state.movies;
                movies.forEach((item: Movie) => {
                    currentMovies.push(item);
                });
                const newMovies: Movie[] = [...currentMovies, ...movies];

                this.setState({movies: newMovies, loading: false, total_pages: totalPages, total_results: totalResults, current_page: page });
                
            });
    }

    loadMoreClick() {
        const currentPage = this.state.current_page + 1;
        this.fetchMovies(currentPage);
      }

    render() {
        return (
            <Stack mt={50}>
                
                <Title order={2}>{this.props.title}</Title>
                <Text color="gray">{this.state.total_results} items</Text>
                <Grid>
                    {this.state.movies?.map(function(movie, index){
                        return <MovieListItem key={index} movie={movie} />;
                    })}
                </Grid>

                {
                    this.state.current_page !== this.state.total_pages && 
                    (
                        <Button 
                            variant="gradient" 
                            gradient={{ from: 'pink', to: 'red' }}  
                            onClick={this.loadMoreClick}>
                                {
                                    
                                    this.state.loading ? (
                                        <Loader variant="dots" color="white"/>
                                    ) :
                                    (
                                        <Text>Load more</Text>
                                    )
                                }
                        </Button>
                    )
                }
                


            </Stack>
            
    )}
};