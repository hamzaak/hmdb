import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
    getNowPlayingCarouselMoviesAsync,
    getUpcomingCarouselMoviesAsync,
    getPopularCarouselMoviesAsync,
    getTopRatedCarouselMoviesAsync
} from "../store/actions/movieListActions";
import {
    selectLatestMovie,
    selectNowPlayingCarouselMoviesStatus, selectNowPlayingCarouselMovies,
    selectUpcomingCarouselMoviesStatus, selectUpcomingCarouselMovies,
    selectPopularCarouselMovies, selectPopularCarouselMoviesStatus,
    selectTopRatedCarouselMovies, selectTopRatedCarouselMoviesStatus,
} from '../store/reducers/movieListReducer';
import './home.css';
import { Text, Stack, Container, Overlay, Title, Rating, Grid, MediaQuery, Center, Loader } from "@mantine/core";
import { TMDB_IMG_URL } from '../config';
import MovieCarousel from '../components/movieCarousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Home() {
    const latestMovie = useAppSelector(selectLatestMovie);
    const nowPlayingCarouselMovies = useAppSelector(selectNowPlayingCarouselMovies);
    const nowPlayingCarouselMoviesStatus = useAppSelector(selectNowPlayingCarouselMoviesStatus);
    const upcomingCarouselMovies = useAppSelector(selectUpcomingCarouselMovies);
    const upcomingCarouselMoviesStatus = useAppSelector(selectUpcomingCarouselMoviesStatus);
    const popularCarouselMovies = useAppSelector(selectPopularCarouselMovies);
    const popularCarouselMoviesStatus = useAppSelector(selectPopularCarouselMoviesStatus);
    const topRatedCarouselMovies = useAppSelector(selectTopRatedCarouselMovies);
    const topRatedCarouselMoviesStatus = useAppSelector(selectTopRatedCarouselMoviesStatus);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (nowPlayingCarouselMovies.length === 0) {
            
        }

        dispatch(getNowPlayingCarouselMoviesAsync())
                .then(resNowPlaying => {
                    console.log('now playing movies fetched');
                    dispatch(getUpcomingCarouselMoviesAsync())
                        .then(resUpcoming => {
                            console.log('upcoming movies fetched');
                            dispatch(getPopularCarouselMoviesAsync())
                                .then(resPopular => {
                                    console.log('popular movies fetched');
                                    dispatch(getTopRatedCarouselMoviesAsync())
                                        .then(resTopRated => {
                                            console.log('top rated movies fetched');
                                        });
                                });
                        });
                });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container fluid>
            <Grid>
                <Grid.Col span={2}></Grid.Col>
                <Grid.Col span="auto">
                    <Container fluid className='now-playing' style={{ padding: 0, margin: 0 }}>
                        {
                            latestMovie.backdrop_path && (
                                <LazyLoadImage
                                    alt='Latest Movie'
                                    style={{ marginRight: 'auto', marginLeft: 'auto', width: '100%' }}
                                    src={`${TMDB_IMG_URL}/w1280${latestMovie.backdrop_path}`} />
                            )
                        }
                    </Container>
                    {
                        upcomingCarouselMoviesStatus === 'loading' && (
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
                upcomingCarouselMoviesStatus !== 'loading' && (
                    <>
                        <MediaQuery smallerThan="lg" styles={{ display: 'none' }}>
                            <Overlay opacity={0} style={{ marginLeft: '7rem', marginBottom: '7rem' }}>
                                <Stack align="flex-start" justify="center" style={{ height: '100%', width: '50%' }}>
                                    <Title order={2}>{latestMovie.original_title}</Title>
                                    <Rating value={latestMovie.vote_average ? latestMovie.vote_average / 2 : 0} fractions={50} readOnly />
                                    <Text ta="left" fz="lg">
                                        {latestMovie.overview}
                                    </Text>
                                </Stack>
                            </Overlay>
                        </MediaQuery>

                        <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                            <Stack mt={20} align="flex-start" justify="center" style={{ width: '100%' }}>
                                <Title order={2}>{latestMovie.original_title}</Title>
                                <Rating value={latestMovie.vote_average ? latestMovie.vote_average / 2 : 0} fractions={50} readOnly />
                                <Text ta="left" fz="lg">
                                    {latestMovie.overview}
                                </Text>
                            </Stack>
                        </MediaQuery>
                    </>
                )
            }

            {
                nowPlayingCarouselMoviesStatus !== 'loading' && (
                    <MovieCarousel
                        category='now_playing'
                        title='Now playing movies'
                        movies={nowPlayingCarouselMovies} />
                )
            }

            {
                popularCarouselMoviesStatus !== 'loading' && (
                    <MovieCarousel
                        category='popular'
                        title='Popular movies'
                        movies={popularCarouselMovies} />
                )
            }

            {
                upcomingCarouselMoviesStatus !== 'loading' && (
                    <MovieCarousel
                        category='upcoming'
                        title='Upcoming movies'
                        movies={upcomingCarouselMovies} />
                )
            }

            {
                topRatedCarouselMoviesStatus !== 'loading' && (
                    <MovieCarousel
                        category='top_rated'
                        title='Top rated movies'
                        movies={topRatedCarouselMovies} />
                )
            }

        </Container>
    )
};
