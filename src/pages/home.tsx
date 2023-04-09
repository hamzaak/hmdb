import { useEffect, lazy, Suspense } from "react";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import './home.css';
import { Container } from "@mantine/core";
import { selectNowPlayingMovies, selectNowPlayingMoviesLatestMovie } from "../store/movie/now-playing/selectors";
import { fetchNowPlayingMovies } from "../store/movie/now-playing/actions";
import { selectUpcomingMovies } from "../store/movie/upcoming/selectors";
import { fetchUpcomingMovies } from "../store/movie/upcoming/actions";
import { selectPopularMovies } from "../store/movie/popular/selectors";
import { fetchPopularMovies } from "../store/movie/popular/actions";
import { selectTopRatedMovies } from "../store/movie/top-rated/selectors";
import { fetchTopRatedMovies } from "../store/movie/top-rated/actions";

const LatestMovie = lazy(() => import('../components/latestMovie'));
const MovieCarousel = lazy(() => import('../components/movieCarousel'));

export default function Home() {
    const nowPlayingMovies = useAppSelector(selectNowPlayingMovies);
    const latestMovie = useAppSelector(selectNowPlayingMoviesLatestMovie);
    const upcomingMovies = useAppSelector(selectUpcomingMovies);
    const popularMovies = useAppSelector(selectPopularMovies);
    const topRatedMovies = useAppSelector(selectTopRatedMovies);

    const dispatch = useAppDispatch();

    useEffect(() => {

        if (nowPlayingMovies.length === 0) {
            dispatch(fetchNowPlayingMovies());
        }

        if (upcomingMovies.length === 0) {
            dispatch(fetchUpcomingMovies());
        }

        if (popularMovies.length === 0) {
            dispatch(fetchPopularMovies());
        }

        if (topRatedMovies.length === 0) {
            dispatch(fetchTopRatedMovies());
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container fluid>
            <Suspense >
                <LatestMovie movie={latestMovie} />
            </Suspense>

            <Suspense>
                <MovieCarousel
                    category='now_playing'
                    title='Now playing movies'
                    movies={nowPlayingMovies.slice(0, 20)} />
            </Suspense>

            <Suspense >
                <MovieCarousel
                    category='upcoming'
                    title='Upcoming movies'
                    movies={upcomingMovies.slice(0, 20)} />
            </Suspense>

            <Suspense >
                <MovieCarousel
                    category='popular'
                    title='Popular movies'
                    movies={popularMovies.slice(0, 20)} />
            </Suspense>

            <Suspense >
                <MovieCarousel
                    category='top_rated'
                    title='Top rated movies'
                    movies={topRatedMovies.slice(0, 20)} />
            </Suspense>
        </Container>
    )
};
