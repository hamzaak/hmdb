import React from 'react';
import axios from 'axios';
import './home.css';
import { Text, Stack, Container, Image, Overlay, Title, Rating, Grid, MediaQuery, Loader } from "@mantine/core";
import { Carousel } from '@mantine/carousel';
import { tmdbKey, tmdbBaseUrl, tmdbImageBaseUrl } from '../config';
import { Movie } from '../models/movie';

interface IHomeProps {
}

interface IHomeState {
    latestMovie?: Movie;
    nowPlayingMovies?: [Movie];
    nowPlayingMoviesLoading?: boolean;
}

export default class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
    
        this.state = {
            latestMovie: {},
            nowPlayingMovies: [{}],
            nowPlayingMoviesLoading: true
        };
      }
    
    componentDidMount() {
        axios.get(`${tmdbBaseUrl}/movie/now_playing?api_key=${tmdbKey}&page=1`)
            .then(res => {
                const movies = res.data.results;
                const latestMovie = res.data.results[0];
                this.setState({ latestMovie: latestMovie, nowPlayingMovies: movies, nowPlayingMoviesLoading: false });
                
            });
        /*
        axios.get(`${tmdbBaseUrl}/movie/now_playing?api_key=${tmdbKey}`)
            .then(res => {
                const latestMovie = res.data.results[0];
                this.setState({ latestMovie });
            });*/
    }

    render() {
        return (
            <Container fluid>
                <Grid>
                    <Grid.Col span={2}></Grid.Col>
                    <Grid.Col span="auto">
                        <Container fluid className='now-playing' style={{padding:0, margin:0}}>
                            {
                                this.state.latestMovie?.backdrop_path && 
                                (
                                    <Image mx="auto" src={tmdbImageBaseUrl + '/t/p/w1280' + this.state.latestMovie?.backdrop_path} alt="Latest Movie" />
                                )
                            }
                        </Container>
                    </Grid.Col>
                </Grid>

                <MediaQuery smallerThan="lg" styles={{ display: 'none' }}>
                    <Overlay opacity={0} style={{marginLeft: '7rem'}}>
                        <Stack align="flex-start" justify="center" style={{height: '100%', width: '50%'}}>
                            <Title order={2}>{this.state.latestMovie?.original_title}</Title>
                            <Rating value={this.state.latestMovie?.vote_average ? this.state.latestMovie?.vote_average / 2 : 0} fractions={50} readOnly/>
                            <Text ta="left" fz="lg">
                                {this.state.latestMovie?.overview}
                            </Text>
                        </Stack>
                    </Overlay>
                </MediaQuery>

                {
                    this.state.nowPlayingMoviesLoading && (
                    <Overlay opacity={1} style={{marginLeft: '7rem'}}>
                        <Stack align="center" justify="center" style={{height: '100%', width: '100%'}}>
                            <Loader color="red" />
                        </Stack>
                    </Overlay>
                    )
                }
                
                <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                    <Stack mt={20} align="flex-start" justify="center" style={{height: '100%', width: '100%'}}>
                        <Title order={2}>{this.state.latestMovie?.original_title}</Title>
                        <Rating value={this.state.latestMovie?.vote_average ? this.state.latestMovie?.vote_average / 2 : 0} fractions={50} readOnly/>
                        <Text ta="left" fz="lg">
                            {this.state.latestMovie?.overview}
                        </Text>
                    </Stack>
                </MediaQuery>

                <Stack mt={20}>
                    <Title order={2}>Now playing movies</Title>
                    <Carousel
                        height={440}
                        slideSize="20%"
                        slideGap="xs"
                        align="start"
                        slidesToScroll={5}>
                        {this.state.nowPlayingMovies?.map(function(movie, index){
                            return <Carousel.Slide key={index}>
                                <Stack spacing={5} style={{cursor: 'pointer'}}>
                                    {
                                        movie.backdrop_path && 
                                        (
                                            <Image className='image-hover-zoom' height={360} mx="auto" src={tmdbImageBaseUrl + '/t/p/w1280' + movie.backdrop_path} alt={movie.original_title} />
                                        )
                                    }
                                    <Text w={200} >{movie.original_title}</Text>
                                    <Rating value={movie.vote_average ? movie.vote_average / 2 : 0} fractions={50} readOnly/>
                                </Stack>
                                
                                </Carousel.Slide>;
                        })}
                    </Carousel>
                    
                </Stack>
            </Container>
    )}
};