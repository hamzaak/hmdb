import React from 'react';
import axios from 'axios';
import './home.css';
import { Text, Stack, Container, Image, Overlay, Title, Rating, Grid, MediaQuery, Anchor } from "@mantine/core";
import { tmdbKey, tmdbBaseUrl, tmdbImageBaseUrl } from '../config';
import { Movie } from '../models/movie';
import MovieCarousel from '../components/movie-carousel';
import { Carousel } from '@mantine/carousel';
import MovieItem from '../components/movie-item';

interface IHomeProps {
}

interface IHomeState {
    latestMovie?: Movie;
    movies?: [Movie];
    loading?: boolean;
}

export default class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
    
        this.state = {
            latestMovie: {},
            movies: [{}],
            loading: true
        };
      }
    
    componentDidMount() {
        axios.get(`${tmdbBaseUrl}/movie/now_playing?api_key=${tmdbKey}&page=1`)
            .then(res => {
                const movies = res.data.results;
                const latestMovie = movies[0];
                movies.shift();
                this.setState({ latestMovie: latestMovie, movies: movies, loading: false });
            });
    }

    render() {
        return (
            <Container fluid>
                { 
                    !this.state.loading && 
                    (
                        <>
                        <Grid>
                            <Grid.Col span={2}></Grid.Col>
                            <Grid.Col span="auto">
                                <Container fluid className='now-playing' style={{padding:0, margin:0}}>
                                    <Image mx="auto" src={tmdbImageBaseUrl + '/t/p/w1280' + this.state.latestMovie?.backdrop_path} alt="Latest Movie" />
                                </Container>
                            </Grid.Col>
                        </Grid>

                        <MediaQuery smallerThan="lg" styles={{ display: 'none' }}>
                            <Overlay opacity={0} style={{marginLeft: '7rem', marginBottom: '7rem'}}>
                                <Stack align="flex-start" justify="center" style={{height: '100%', width: '50%'}}>
                                    <Title order={2}>{this.state.latestMovie?.original_title}</Title>
                                    <Rating value={this.state.latestMovie?.vote_average ? this.state.latestMovie?.vote_average / 2 : 0} fractions={50} readOnly/>
                                    <Text ta="left" fz="lg">
                                        {this.state.latestMovie?.overview}
                                    </Text>
                                </Stack>
                            </Overlay>
                        </MediaQuery>

                        <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                            <Stack mt={20} align="flex-start" justify="center" style={{ width: '100%'}}>
                                <Title order={2}>{this.state.latestMovie?.original_title}</Title>
                                <Rating value={this.state.latestMovie?.vote_average ? this.state.latestMovie?.vote_average / 2 : 0} fractions={50} readOnly/>
                                <Text ta="left" fz="lg">
                                    {this.state.latestMovie?.overview}
                                </Text>
                            </Stack>
                        </MediaQuery>
                        

                        <Stack mt={30} >
                            <Grid>
                                <Grid.Col span="content">
                                    <Text fz="lg">Now playing movies</Text>
                                </Grid.Col>
                                <Grid.Col span="content">
                                    <Text fz="lg">
                                        <Anchor href='/now_playing' color='red.8'>
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
                        </>
                    )
                    
                }
                
                <MovieCarousel
                    movieType='popular'
                    title='Popular movies' />
                    
                <MovieCarousel
                    movieType='upcoming'
                    title='Upcoming movies' />

                <MovieCarousel
                    movieType='top_rated'
                    title='Top rated movies' />
                
            </Container>
    )}
};