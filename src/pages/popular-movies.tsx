import { useEffect } from "react";
import { Text, Container, Grid, Stack, Title, Loader, Button } from "@mantine/core";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import MovieListItem from "../components/movie-list-item";
import { 
    selectPopularMoviesPage, 
    selectPopularMovies,
    selectPopularMoviesTotalPages,
    selectPopularMoviesTotalResults,
    selectPopularMoviesStatus
} from "../store/movie/popular/selectors";
import { fetchPopularMovies } from "../store/movie/popular/actions";

export default function PopularMovies () {
    const popularMoviesPage = useAppSelector(selectPopularMoviesPage);
    const popularMovies = useAppSelector(selectPopularMovies);
    const popularMoviesStatus = useAppSelector(selectPopularMoviesStatus);
    const popularMoviesTotalPages = useAppSelector(selectPopularMoviesTotalPages);
    const popularMoviesTotalResults = useAppSelector(selectPopularMoviesTotalResults);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if(popularMovies.length === 0) {
            dispatch(fetchPopularMovies());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    function loadMoreClick() {
        dispatch(fetchPopularMovies(popularMoviesPage + 1));
    }

    return (
        <Container fluid mr={30}>
            <Stack mt={50}>
                <Title order={2}>Popular Movies</Title>
                <Text color="gray">{ popularMoviesTotalResults } items</Text>
                <Grid>
                    {popularMovies?.map(function (movie, index) {
                        return <MovieListItem key={index} movie={movie} />;
                    })}
                </Grid>

                {
                    popularMoviesPage !== popularMoviesTotalPages &&
                    (
                        <Button
                            variant="gradient"
                            gradient={{ from: 'pink', to: 'red' }}
                            onClick={loadMoreClick}>
                            {
                                popularMoviesStatus === 'loading' ? (
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