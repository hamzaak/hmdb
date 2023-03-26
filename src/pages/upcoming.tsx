import React from 'react';
import { Container } from "@mantine/core";
import MovieList from '../components/movie-list';

export default class Upcoming extends React.Component {
   
    render() {
        return (
            <Container fluid mr={30}>
                <MovieList
                    movieType='upcoming'
                    title='Upcoming movies'
                    ></MovieList>
            </Container>
    )}
};