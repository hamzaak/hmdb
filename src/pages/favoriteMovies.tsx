import { useEffect } from "react";
import { Text, Container, Grid, Stack, Title } from "@mantine/core";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { getFavoriteMovieAsync } from "../store/actions/movieFavoriteActions";
import { selectFavoriteMovies } from "../store/reducers/movieFavoriteReducer";
import MovieListItem from "../components/movieListItem";

export default function FavoriteMovies () {
    const movies = useAppSelector(selectFavoriteMovies);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(getFavoriteMovieAsync());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <Container fluid mr={30}>
            <Stack mt={50}>
                <Title order={2}>Your Favorite Movies</Title>
                <Text color="gray">{movies.length} items</Text>
                <Grid>
                    {movies?.map(function(movie, index){
                        return <MovieListItem key={index} movie={movie} />;
                    })}
                </Grid>
            </Stack>
            
            
        </Container>
    )
};