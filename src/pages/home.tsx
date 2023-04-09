import { useEffect, lazy, Suspense } from "react";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import './home.css';
import { Container } from "@mantine/core";
import { selectNowPlayingMoviesLatestMovie } from "../store/movie/now-playing/selectors";
import { fetchNowPlayingMovies } from "../store/movie/now-playing/actions";

const LatestMovie = lazy(() => import('../components/latestMovie'));
const NowPlayingCarousel = lazy(() => import('../components/nowPlayingCarousel'));
const UpcomingCarousel = lazy(() => import('../components/upcomingCarousel'));
const PopularCarousel = lazy(() => import('../components/popularCarousel'));
const TopRatedCarousel = lazy(() => import('../components/topRatedCarousel'));

export default function Home() {
    const latestMovie = useAppSelector(selectNowPlayingMoviesLatestMovie);

    const dispatch = useAppDispatch();

    useEffect(() => {

        if (!latestMovie) {
            dispatch(fetchNowPlayingMovies());
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container fluid>
            <Suspense >
                <LatestMovie movie={latestMovie} />
            </Suspense>

            <Suspense>
                <NowPlayingCarousel />
            </Suspense>

            <Suspense >
                <UpcomingCarousel />
            </Suspense>

            <Suspense >
                <PopularCarousel />
            </Suspense>

            <Suspense >
                <TopRatedCarousel />
            </Suspense>
        </Container>
    )
};
