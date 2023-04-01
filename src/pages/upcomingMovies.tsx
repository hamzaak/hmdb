import { useEffect } from "react";
import { Text, Container, Grid, Stack, Title, Loader, Button } from "@mantine/core";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { getUpcomingMoviesAsync } from "../store/actions/movieListActions";
import { selectUpcomingMoviesStatus, selectUpcomingMovies } from '../store/reducers/movieListReducer';
import MovieListItem from "../components/movieListItem";

export default function UpcomingMovies () {
    const response = useAppSelector(selectUpcomingMovies);
    const responseStatus = useAppSelector(selectUpcomingMoviesStatus);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(getUpcomingMoviesAsync(response.last_page));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    function loadMoreClick() {
        dispatch(getUpcomingMoviesAsync(response.last_page));
    }

    return (
        <Container fluid mr={30}>
            <Stack mt={50}>
                <Title order={2}>Upcoming Movies</Title>
                <Text color="gray">{response.total_results} items</Text>
                <Grid>
                    {response.movies?.map(function(movie, index){
                        return <MovieListItem key={index} movie={movie} />;
                    })}
                </Grid>

                {
                    response.last_page !== response.total_pages && 
                    (
                        <Button 
                            variant="gradient" 
                            gradient={{ from: 'pink', to: 'red' }}  
                            onClick={loadMoreClick}>
                                {
                                    responseStatus === 'loading' ? (
                                        <Loader variant="dots" color="white"/>
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