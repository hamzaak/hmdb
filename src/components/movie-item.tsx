import React from 'react';
import { Text, Stack, Image, Rating } from "@mantine/core";
import { tmdbImageBaseUrl } from '../config';
import { Movie } from '../models/movie';

interface IMovieItemProps {
    movie: Movie;
}

interface IMovieItemState {
    
}

export default class MovieItem extends React.Component<IMovieItemProps, IMovieItemState> {
    
    render() {
        return (
            <Stack spacing={5} style={{cursor: 'pointer'}}>
                {
                    this.props.movie.poster_path && 
                    (
                        <Image className='image-hover-zoom' height={300} src={tmdbImageBaseUrl + '/t/p/w342' + this.props.movie.poster_path} alt={this.props.movie.original_title} />
                    )
                }
                <Text w={200} >{this.props.movie.original_title}</Text>
                <Rating value={this.props.movie.vote_average ? this.props.movie.vote_average / 2 : 0} fractions={50} readOnly/>
            </Stack>
    )}
};