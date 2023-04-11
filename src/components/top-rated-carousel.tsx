import { Text, Stack, Grid } from "@mantine/core";
import { Carousel } from '@mantine/carousel';
import MovieItem from './movie-item';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { selectTopRatedMovies } from "../store/movie/top-rated/selectors";
import { fetchTopRatedMovies } from "../store/movie/top-rated/actions";

export default function TopRatedCarousel () {
    const movies = useAppSelector(selectTopRatedMovies);
    const dispatch = useAppDispatch();
    
    useEffect(() => {

        if (movies.length === 0) {
            dispatch(fetchTopRatedMovies());
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <Stack mt={30}>
            <Grid>
                <Grid.Col span="content">
                    <Text fz="lg">Top Rated Movies </Text>
                </Grid.Col>
                <Grid.Col span="content">
                    <Text fz="lg">
                        <Link to={'/top_rated'} style={{color: '#e03131'}}>Explore all</Link>
                        
                    </Text>
                </Grid.Col>
            </Grid>
            
            <Carousel
                mr={30}
                slideSize={ "20%"}
                slideGap="xs"
                align="start"
                slidesToScroll={4}>
                { movies && movies.slice(0, 15).map(function(movie, index){
                    return <Carousel.Slide key={index}>
                            <MovieItem movie={movie} />
                        </Carousel.Slide>;
                })}
            </Carousel>
        </Stack>
    ) 
};