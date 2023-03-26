import React from 'react';
import axios from 'axios';
import { Text, Stack, Anchor, Grid } from "@mantine/core";
import { Carousel } from '@mantine/carousel';
import { tmdbKey, tmdbBaseUrl } from '../config';
import { Movie } from '../models/movie';
import MovieItem from './movie-item';

interface IMovieCarouselProps {
    title: string;
    movieType: string;
}

interface IMovieCarouselState {
    movies?: [Movie];
    loading?: boolean;
}

export default class MovieCarousel extends React.Component<IMovieCarouselProps, IMovieCarouselState> {
    constructor(props: IMovieCarouselProps) {
        super(props);
    
        this.state = {
            movies: [{}],
            loading: true,
        };
      }
    
    componentDidMount() {
        axios.get(`${tmdbBaseUrl}/movie/${this.props.movieType}?api_key=${tmdbKey}&page=1`)
            .then(res => {
                const movies = res.data.results;

                this.setState({ movies: movies, loading: false });
                
            });
    }

    render() {
        return (
            <>
            {
                !this.state.loading && 
                    (
                        <Stack mt={30}>
                            <Grid>
                                <Grid.Col span="content">
                                    <Text fz="lg">{this.props.title} </Text>
                                </Grid.Col>
                                <Grid.Col span="content">
                                    <Text fz="lg">
                                        <Anchor href={'/' + this.props.movieType} color="red.8">
                                            Explore all
                                        </Anchor>
                                    </Text>
                                </Grid.Col>
                            </Grid>
                            
                            <Carousel
                                mr={30}
                                height={380}
                                slideSize="16.66%"
                                slideGap="xs"
                                align="start"
                                slidesToScroll={6}>
                                {this.state.movies?.map(function(movie, index){
                                    return <Carousel.Slide key={index}>
                                            <MovieItem movie={movie} />
                                        </Carousel.Slide>;
                                })}
                            </Carousel>
                        </Stack>
                    )
            }
            </>
    )}
};