import { useEffect, lazy, Suspense } from "react";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import './home.css';
import { Container } from "@mantine/core";
import { selectNowPlayingMoviesLatestMovie } from "../store/movie/now-playing/selectors";
import { fetchNowPlayingMovies } from "../store/movie/now-playing/actions";

const LatestMovie = lazy(() => import('../components/latest-movie'));
const NowPlayingCarousel = lazy(() => import('../components/now-playing-carousel'));
const UpcomingCarousel = lazy(() => import('../components/upcoming-carousel'));
const PopularCarousel = lazy(() => import('../components/popular-carousel'));
const TopRatedCarousel = lazy(() => import('../components/top-rated-carousel'));

export default function Home() {
    const latestMovie = useAppSelector(selectNowPlayingMoviesLatestMovie);

    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log(process.env.REACT_APP_TMDB_API_KEY);
        
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
