import React from 'react';
import axios from 'axios';
import { Text, Grid, Stack, Title } from "@mantine/core";
import { tmdbKey, tmdbBaseUrl } from '../config';
import { Movie } from '../models/movie';
import MovieItem from './movie-item';

interface IMovieListProps {
    title: string;
    movieType: string;
}

interface IMovieListState {
    movies?: [Movie];
    loading?: boolean;
    total_pages?: number;
    total_results?: number;
}

export default class MovieList extends React.Component<IMovieListProps, IMovieListState> {
    constructor(props: IMovieListProps) {
        super(props);
    
        this.state = {
            movies: [{}],
            loading: true,
        };
      }
    
    componentDidMount() {
        axios.get(`${tmdbBaseUrl}/movie/${this.props.movieType}?api_key=${tmdbKey}&page=1`)
            .then(res => {
                const movieData = res.data;
                const movies = movieData.results;
                const totalPages = movieData.total_pages;
                const totalResults = movieData.total_results;

                this.setState({ movies: movies, loading: false, total_pages: totalPages, total_results: totalResults });
                
            });
    }

    render() {
        return (
            <Stack mt={50}>
                <Title order={2}>{this.props.title}</Title>
                <Text color="gray">{this.state.total_results} items</Text>
                <Grid>
                    {this.state.movies?.map(function(movie, index){
                        return <Grid.Col span={2} key={index}>
                                <MovieItem movie={movie} />
                            </Grid.Col>;
                    })}
                </Grid>
            </Stack>
            
    )}
};