import { useEffect } from "react";
import { Text, Container, Grid, Stack, Title, Loader, Button } from "@mantine/core";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import MovieListItem from "../components/movie-list-item";
import { 
    selectTopRatedMoviesPage, 
    selectTopRatedMovies,
    selectTopRatedMoviesTotalPages,
    selectTopRatedMoviesTotalResults,
    selectTopRatedMoviesStatus
} from "../store/movie/top-rated/selectors";
import { fetchTopRatedMovies } from "../store/movie/top-rated/actions";

export default function TopRatedMovies () {
    const topRatedMoviesPage = useAppSelector(selectTopRatedMoviesPage);
    const topRatedMovies = useAppSelector(selectTopRatedMovies);
    const topRatedMoviesStatus = useAppSelector(selectTopRatedMoviesStatus);
    const topRatedMoviesTotalPages = useAppSelector(selectTopRatedMoviesTotalPages);
    const topRatedMoviesTotalResults = useAppSelector(selectTopRatedMoviesTotalResults);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if(topRatedMovies.length === 0) {
            dispatch(fetchTopRatedMovies());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    function loadMoreClick() {
        dispatch(fetchTopRatedMovies(topRatedMoviesPage + 1));
    }

    return (
        <Container fluid mr={30}>
            <Stack mt={50}>
                <Title order={2}>Top Rated Movies</Title>
                <Text color="gray">{ topRatedMoviesTotalResults } items</Text>
                <Grid>
                    {topRatedMovies?.map(function (movie, index) {
                        return <MovieListItem key={index} movie={movie} />;
                    })}
                </Grid>

                {
                    topRatedMoviesPage !== topRatedMoviesTotalPages &&
                    (
                        <Button
                            variant="gradient"
                            gradient={{ from: 'pink', to: 'red' }}
                            onClick={loadMoreClick}>
                            {
                                topRatedMoviesStatus === 'loading' ? (
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