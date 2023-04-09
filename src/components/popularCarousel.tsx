import { Text, Stack, Grid } from "@mantine/core";
import { Carousel } from '@mantine/carousel';
import MovieItem from './movieItem';
import { Link } from 'react-router-dom';
import { useCurrentWidth } from "../hooks/useCurrentWidth";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { selectPopularMovies } from "../store/movie/popular/selectors";
import { fetchPopularMovies } from "../store/movie/popular/actions";

export default function PopularCarousel () {
    const movies = useAppSelector(selectPopularMovies);
    const dispatch = useAppDispatch();
    let s_width = useCurrentWidth();

    useEffect(() => {

        if (movies.length === 0) {
            dispatch(fetchPopularMovies());
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <Stack mt={30}>
            <Grid>
                <Grid.Col span="content">
                    <Text fz="lg">Popular Movies </Text>
                </Grid.Col>
                <Grid.Col span="content">
                    <Text fz="lg">
                        <Link to={'/popular'} style={{color: '#e03131'}}>Explore all</Link>
                        
                    </Text>
                </Grid.Col>
            </Grid>
            
            <Carousel
                mr={30}
                height={
                    s_width < 480 ? 190 : (
                        s_width < 768 ? 240 : (
                            s_width < 1024 ? 300: 380
                        )) }
                slideSize={
                    s_width < 480 ? "100%" : (
                        s_width < 768 ? "50%" : (
                            s_width < 1024 ? "33.33%": "16.66%"
                        )) }
                slideGap="xs"
                align="start"
                slidesToScroll={
                    s_width < 480 ? 1 : (
                        s_width < 768 ? 2 : (
                            s_width < 1024 ? 3 : 6
                        )
                    )}>
                { movies && movies.slice(0, 15).map(function(movie, index){
                    return <Carousel.Slide key={index}>
                            <MovieItem movie={movie} />
                        </Carousel.Slide>;
                })}
            </Carousel>
        </Stack>
    ) 
};