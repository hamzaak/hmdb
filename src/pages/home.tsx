import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../core/hooks';
import {
    selectLatestMovie,
    getNowPlayingCarouselMoviesAsync, selectNowPlayingCarouselMovies,
    getUpcomingCarouselMoviesAsync, selectUpcomingCarouselMoviesStatus, selectUpcomingCarouselMovies,
    getPopularCarouselMoviesAsync, selectPopularCarouselMovies,
    getTopRatedCarouselMoviesAsync, selectTopRatedCarouselMovies,
  } from '../reducers/moviesReducer';
import './home.css';
import { Text, Stack, Container, Image, Overlay, Title, Rating, Grid, MediaQuery, Center, Loader } from "@mantine/core";
import { tmdbImageBaseUrl } from '../config';
import MovieCarousel from '../components/movieCarousel';

export default function Home() {
    const latestMovie = useAppSelector(selectLatestMovie);
    const nowPlayingCarouselMovies = useAppSelector(selectNowPlayingCarouselMovies);
    const upcomingCarouselMovies = useAppSelector(selectUpcomingCarouselMovies);
    const upcomingCarouselMoviesStatus = useAppSelector(selectUpcomingCarouselMoviesStatus);
    const popularCarouselMovies = useAppSelector(selectPopularCarouselMovies);
    const topRatedCarouselMovies = useAppSelector(selectTopRatedCarouselMovies);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if(nowPlayingCarouselMovies.movies.length === 0) {
            dispatch(getUpcomingCarouselMoviesAsync());
            dispatch(getPopularCarouselMoviesAsync());
            dispatch(getNowPlayingCarouselMoviesAsync());
            dispatch(getTopRatedCarouselMoviesAsync());
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container fluid>
            <Grid>
                <Grid.Col span={2}></Grid.Col>
                <Grid.Col span="auto">
                    <Container fluid className='now-playing' style={{padding:0, margin:0}}>
                        {
                            latestMovie.backdrop_path && (
                                <Image mx="auto" src={tmdbImageBaseUrl + '/t/p/w1280' + latestMovie.backdrop_path} alt="Latest Movie" />
                            )
                        }
                    </Container>
                    {
                        upcomingCarouselMoviesStatus === 'loading' && (
                            <Overlay opacity={1} style={{marginLeft: '7rem', marginBottom: '7rem'}}>
                                <Center style={{height: '100%', width: '100%'}} mx="auto">
                                    <Loader color='red' />
                                </Center>
                            </Overlay>
                        )
                    }
                </Grid.Col>
            </Grid>
            {
                upcomingCarouselMoviesStatus !== 'loading' && (
                    <>
                        <MediaQuery smallerThan="lg" styles={{ display: 'none' }}>
                            <Overlay opacity={0} style={{marginLeft: '7rem', marginBottom: '7rem'}}>
                                <Stack align="flex-start" justify="center" style={{height: '100%', width: '50%'}}>
                                    <Title order={2}>{latestMovie.original_title}</Title>
                                    <Rating value={latestMovie.vote_average ? latestMovie.vote_average / 2 : 0} fractions={50} readOnly/>
                                    <Text ta="left" fz="lg">
                                        {latestMovie.overview}
                                    </Text>
                                </Stack>
                            </Overlay>
                        </MediaQuery>

                        <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                            <Stack mt={20} align="flex-start" justify="center" style={{ width: '100%'}}>
                                <Title order={2}>{latestMovie.original_title}</Title>
                                <Rating value={latestMovie.vote_average ? latestMovie.vote_average / 2 : 0} fractions={50} readOnly/>
                                <Text ta="left" fz="lg">
                                    {latestMovie.overview}
                                </Text>
                            </Stack>
                        </MediaQuery>
                    </>
                )
            }
            
            
            <MovieCarousel
                category='now_playing'
                title='Now playing movies' 
                movies={nowPlayingCarouselMovies.movies}/>

            <MovieCarousel
                category='popular'
                title='Popular movies' 
                movies={popularCarouselMovies.movies}/>
                
            <MovieCarousel
                category='upcoming'
                title='Upcoming movies' 
                movies={upcomingCarouselMovies.movies}/>

            <MovieCarousel
                category='top_rated'
                title='Top rated movies' 
                movies={topRatedCarouselMovies.movies}/>
            
        </Container>
    )
};
