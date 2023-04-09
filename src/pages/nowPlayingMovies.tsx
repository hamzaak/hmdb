import { useEffect } from "react";
import { Text, Container, Grid, Stack, Title, Loader, Button } from "@mantine/core";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import MovieListItem from "../components/movieListItem";
import { 
    selectNowPlayingMovies, 
    selectNowPlayingMoviesPage, 
    selectNowPlayingMoviesStatus, 
    selectNowPlayingMoviesTotalPages, 
    selectNowPlayingMoviesTotalResults 
} from "../store/movie/now-playing/selectors";
import { fetchNowPlayingMovies } from "../store/movie/now-playing/actions";

export default function NowPlayingMovies() {
    const nowPlayingMoviesPage = useAppSelector(selectNowPlayingMoviesPage);
    const nowPlayingMovies = useAppSelector(selectNowPlayingMovies);
    const nowPlayingMoviesTotalPages = useAppSelector(selectNowPlayingMoviesTotalPages);
    const nowPlayingMoviesTotalResults = useAppSelector(selectNowPlayingMoviesTotalResults);
    const nowPlayingMoviesStatus = useAppSelector(selectNowPlayingMoviesStatus);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(nowPlayingMovies.length === 0) {
            dispatch(fetchNowPlayingMovies());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function loadMoreClick() {
        dispatch(fetchNowPlayingMovies(nowPlayingMoviesPage + 1));
    }

    return (
        <Container fluid mr={30}>
            <Stack mt={50}>
                <Title order={2}>Now Playing Movies</Title>
                <Text color="gray">{ nowPlayingMoviesTotalResults } items</Text>
                <Grid>
                    {nowPlayingMovies?.map(function (movie, index) {
                        return <MovieListItem key={index} movie={movie} />;
                    })}
                </Grid>

                {
                    nowPlayingMoviesPage !== nowPlayingMoviesTotalPages &&
                    (
                        <Button
                            variant="gradient"
                            gradient={{ from: 'pink', to: 'red' }}
                            onClick={loadMoreClick}>
                            {
                                nowPlayingMoviesStatus === 'loading' ? (
                                    <Loader variant="dots" color="white" />
                                ) :
                                    (
                                        <Text>Load more</Text>
                                    )
                            }
                        </Button>
                    )
                }
            </Stack>


        </Container>
    )
};