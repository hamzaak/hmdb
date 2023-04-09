import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import './home.css';
import { Text, Stack, Container, Overlay, Title, Rating, Grid, MediaQuery, Center, Loader } from "@mantine/core";
import { TMDB_IMG_URL } from '../config';
import MovieCarousel from '../components/movieCarousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { selectNowPlayingMovies, selectNowPlayingMoviesLatestMovie, selectNowPlayingMoviesStatus } from "../store/movie/now-playing/selectors";
import { fetchNowPlayingMovies } from "../store/movie/now-playing/actions";
import { selectUpcomingMovies, selectUpcomingMoviesStatus } from "../store/movie/upcoming/selectors";
import { fetchUpcomingMovies } from "../store/movie/upcoming/actions";
import { selectPopularMovies, selectPopularMoviesStatus } from "../store/movie/popular/selectors";
import { fetchPopularMovies } from "../store/movie/popular/actions";
import { selectTopRatedMovies, selectTopRatedMoviesStatus } from "../store/movie/top-rated/selectors";
import { fetchTopRatedMovies } from "../store/movie/top-rated/actions";

export default function Home() {
    const nowPlayingMovies = useAppSelector(selectNowPlayingMovies);
    const latestMovie = useAppSelector(selectNowPlayingMoviesLatestMovie);
    const nowPlayingMoviesStatus = useAppSelector(selectNowPlayingMoviesStatus);

    const upcomingMovies = useAppSelector(selectUpcomingMovies);
    const upcomingMoviesStatus = useAppSelector(selectUpcomingMoviesStatus);

    const popularMovies = useAppSelector(selectPopularMovies);
    const popularMoviesStatus = useAppSelector(selectPopularMoviesStatus);

    const topRatedMovies = useAppSelector(selectTopRatedMovies);
    const topRatedMoviesStatus = useAppSelector(selectTopRatedMoviesStatus);
    
    const [isLargestImageLoaded, setIsLargestImageLoaded] = useState(false);
    
    const dispatch = useAppDispatch();

    useEffect(() => {

        if(nowPlayingMovies.length === 0) {
            dispatch(fetchNowPlayingMovies());
        } 

        if(upcomingMovies.length === 0) {
            dispatch(fetchUpcomingMovies());
        }

        if(popularMovies.length === 0) {
            dispatch(fetchPopularMovies());
        }

        if(topRatedMovies.length === 0) {
            dispatch(fetchTopRatedMovies());
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container fluid>
            <Grid>
                <Grid.Col span={2}></Grid.Col>
                <Grid.Col span="auto">
                    <Container fluid className='now-playing' style={{ padding: 0, margin: 0, height: '100%', width: '100%' }}>
                        {
                            latestMovie?.backdrop_path && (
                                <LazyLoadImage
                                    alt='Latest Movie'
                                    onLoad={() => setIsLargestImageLoaded(true)}
                                    style={{ marginRight: 'auto', marginLeft: 'auto', width: '100%' }}
                                    src={`${TMDB_IMG_URL}/w1280${latestMovie.backdrop_path}`} />
                            )
                        }
                    </Container>
                    {
                        !isLargestImageLoaded && (
                            <Overlay opacity={1} style={{ marginLeft: '7rem', marginBottom: '7rem' }}>
                                <Center style={{ height: '100%', width: '100%' }} mx="auto">
                                    <Loader color='red' />
                                </Center>
                            </Overlay>
                        )
                    }
                </Grid.Col>
            </Grid>
            {
                isLargestImageLoaded && (
                    <>
                        <MediaQuery smallerThan="lg" styles={{ display: 'none' }}>
                            <Overlay opacity={0} style={{ marginLeft: '7rem', marginBottom: '7rem' }}>
                                <Stack align="flex-start" justify="center" style={{ height: '100%', width: '50%' }}>
                                    <Title order={2}>{latestMovie?.original_title}</Title>
                                    <Rating value={latestMovie?.vote_average ? latestMovie?.vote_average / 2 : 0} fractions={50} readOnly />
                                    <Text ta="left" fz="lg">
                                        {latestMovie?.overview}
                                    </Text>
                                </Stack>
                            </Overlay>
                        </MediaQuery>

                        <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                            <Stack mt={20} align="flex-start" justify="center" style={{ width: '100%' }}>
                                <Title order={2}>{latestMovie?.original_title}</Title>
                                <Rating value={latestMovie?.vote_average ? latestMovie?.vote_average / 2 : 0} fractions={50} readOnly />
                                <Text ta="left" fz="lg">
                                    {latestMovie?.overview}
                                </Text>
                            </Stack>
                        </MediaQuery>
                    </>
                )
            }

            {
                nowPlayingMoviesStatus !== 'loading' && isLargestImageLoaded && (
                    <MovieCarousel
                        category='now_playing'
                        title='Now playing movies'
                        movies={ nowPlayingMovies.slice(0, 20) } />
                )
            }
            
            {
                upcomingMoviesStatus !== 'loading' && isLargestImageLoaded && (
                    <MovieCarousel
                        category='upcoming'
                        title='Upcoming movies'
                        movies={ upcomingMovies.slice(0, 20) } />
                )
            }

            {
                popularMoviesStatus !== 'loading' && isLargestImageLoaded && (
                    <MovieCarousel
                        category='popular'
                        title='Popular movies'
                        movies={ popularMovies.slice(0, 20) } />
                )
            }

            {
                topRatedMoviesStatus !== 'loading' && isLargestImageLoaded && (
                    <MovieCarousel
                        category='top_rated'
                        title='Top rated movies'
                        movies={ topRatedMovies.slice(0, 20) } />
                )
            }

        </Container>
    )
};
