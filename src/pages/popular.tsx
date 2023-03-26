import React from 'react';
import { Container } from "@mantine/core";
import MovieList from '../components/movie-list';

export default class Popular extends React.Component {
   
    render() {
        return (
            <Container fluid style={{paddingTop: 0, paddingRight: 40 }}>
                <MovieList
                    movieType='popular'
                    title='Popular movies'
                    ></MovieList>
            </Container>
    )}
};