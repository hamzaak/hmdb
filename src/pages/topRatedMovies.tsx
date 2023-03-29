import { useEffect } from "react";
import { Text, Container, Grid, Stack, Title, Loader, Button } from "@mantine/core";
import { useAppSelector, useAppDispatch } from '../core/hooks';
import {
    getTopRatedMoviesAsync, selectTopRatedMoviesStatus, selectTopRatedMovies
  } from '../reducers/moviesReducer';
import MovieListItem from "../components/movieListItem";

export default function TopRatedMovies () {
    const response = useAppSelector(selectTopRatedMovies);
    const responseStatus = useAppSelector(selectTopRatedMoviesStatus);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(getTopRatedMoviesAsync(response.last_page));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    function loadMoreClick() {
        dispatch(getTopRatedMoviesAsync(response.last_page));
    }

    return (
        <Container fluid mr={30}>
            <Stack mt={50}>
                <Title order={2}>Top Rated Movies</Title>
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