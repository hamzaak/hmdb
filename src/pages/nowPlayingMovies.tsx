import { useEffect } from "react";
import { Text, Container, Grid, Stack, Title, Loader, Button } from "@mantine/core";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { getNowPlayingMoviesAsync } from "../store/actions/movieListActions";
import { selectNowPlayingMoviesStatus, selectNowPlayingMovies } from '../store/reducers/movieListReducer';
import MovieListItem from "../components/movieListItem";

export default function NowPlayingMovies () {
    const response = useAppSelector(selectNowPlayingMovies);
    const responseStatus = useAppSelector(selectNowPlayingMoviesStatus);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(getNowPlayingMoviesAsync(response.last_page));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    function loadMoreClick() {
        dispatch(getNowPlayingMoviesAsync(response.last_page));
    }

    return (
        <Container fluid mr={30}>
            <Stack mt={50}>
                <Title order={2}>Now Playing Movies</Title>
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