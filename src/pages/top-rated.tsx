import React from 'react';
import { Container } from "@mantine/core";
import MovieList from '../components/movie-list';

export default class TopRated extends React.Component {
   
    render() {
        return (
            <Container fluid mr={30}>
                <MovieList
                    movieType='top_rated'
                    title='Top rated movies'
                    ></MovieList>
            </Container>
    )}
};