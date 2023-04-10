import { useEffect } from "react";
import { Text, Container, Grid, Stack, Title, Loader, Button } from "@mantine/core";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import MovieListItem from "../components/movie-list-item";
import { 
    selectUpcomingMovies, 
    selectUpcomingMoviesPage, 
    selectUpcomingMoviesStatus, 
    selectUpcomingMoviesTotalPages,
    selectUpcomingMoviesTotalResults
} from "../store/movie/upcoming/selectors";
import { fetchUpcomingMovies } from "../store/movie/upcoming/actions";

export default function UpcomingMovies () {
    const upcomingMoviesPage = useAppSelector(selectUpcomingMoviesPage);
    const upcomingMovies = useAppSelector(selectUpcomingMovies);
    const upcomingMoviesStatus = useAppSelector(selectUpcomingMoviesStatus);
    const upcomingMoviesTotalPages = useAppSelector(selectUpcomingMoviesTotalPages);
    const upcomingMoviesTotalResults = useAppSelector(selectUpcomingMoviesTotalResults);

    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if(upcomingMovies.length === 0) {
            dispatch(fetchUpcomingMovies());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    function loadMoreClick() {
        dispatch(fetchUpcomingMovies(upcomingMoviesPage + 1));
    }

    return (
        <Container fluid mr={30}>
            <Stack mt={50}>
                <Title order={2}>Upcoming Movies</Title>
                <Text color="gray">{ upcomingMoviesTotalResults } items</Text>
                <Grid>
                    {upcomingMovies?.map(function (movie, index) {
                        return <MovieListItem key={index} movie={movie} />;
                    })}
                </Grid>

                {
                    upcomingMoviesPage !== upcomingMoviesTotalPages &&
                    (
                        <Button
                            variant="gradient"
                            gradient={{ from: 'pink', to: 'red' }}
                            onClick={loadMoreClick}>
                            {
                                upcomingMoviesStatus === 'loading' ? (
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