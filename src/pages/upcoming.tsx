import React from 'react';
import { Container } from "@mantine/core";
import MovieList from '../components/movie-list';

export default class Upcoming extends React.Component {
   
    render() {
        return (
            <Container fluid style={{paddingTop: 0, paddingRight: 40 }}>
                <MovieList
                    movieType='upcoming'
                    title='Upcoming movies'
                    ></MovieList>
            </Container>
    )}
};