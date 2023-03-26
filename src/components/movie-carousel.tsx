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
    movies: Movie[];
    loading: boolean;
    s_width: number;
}

export default class MovieCarousel extends React.Component<IMovieCarouselProps, IMovieCarouselState> {
    constructor(props: IMovieCarouselProps) {
        super(props);
        
        this.state = {
            movies: [],
            loading: true,
            s_width: window.innerWidth
        };

        this.handleResize = this.handleResize.bind(this);
        window.addEventListener('resize', this.handleResize)
      }

    handleResize() {
        this.setState({ s_width: window.innerWidth });
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
                                height={
                                    this.state.s_width < 480 ? 190 : (
                                        this.state.s_width < 768 ? 240 : (
                                            this.state.s_width < 1024 ? 300: 380
                                        )) }
                                slideSize={
                                    this.state.s_width < 480 ? "100%" : (
                                        this.state.s_width < 768 ? "50%" : (
                                            this.state.s_width < 1024 ? "33.33%": "16.66%"
                                        )) }
                                slideGap="xs"
                                align="start"
                                slidesToScroll={
                                    this.state.s_width < 480 ? 1 : (
                                        this.state.s_width < 768 ? 2 : (
                                            this.state.s_width < 1024 ? 3 : 6
                                        )
                                    )}>
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