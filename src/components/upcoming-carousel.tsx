import { Text, Stack, Grid } from "@mantine/core";
import { Carousel } from '@mantine/carousel';
import MovieItem from './movie-item';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { selectUpcomingMovies } from "../store/movie/upcoming/selectors";
import { fetchUpcomingMovies } from "../store/movie/upcoming/actions";

export default function UpcomingCarousel () {
    const movies = useAppSelector(selectUpcomingMovies);
    const dispatch = useAppDispatch();
    
    useEffect(() => {

        if (movies.length === 0) {
            dispatch(fetchUpcomingMovies());
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <Stack mt={30}>
            <Grid>
                <Grid.Col span="content">
                    <Text fz="lg">Upcoming Movies </Text>
                </Grid.Col>
                <Grid.Col span="content">
                    <Text fz="lg">
                        <Link to={'/upcoming'} style={{color: '#e03131'}}>Explore all</Link>
                        
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