import React from 'react';
import { Container } from "@mantine/core";
import MovieList from '../components/movie-list';

export default class NowPlaying extends React.Component {
   
    render() {
        return (
            <Container fluid mr={30}>
                <MovieList
                    movieType='now_playing'
                    title='Now playing movies'
                    ></MovieList>
            </Container>
    )}
};