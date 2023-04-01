import React from 'react';
import { Text, Stack, Rating } from "@mantine/core";
import { TMDB_IMG_URL } from '../config';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IMovie } from '../store/types/movie';

interface IMovieItemProps {
    movie: IMovie;
}

interface IMovieItemState { }

export default class MovieItem extends React.Component<IMovieItemProps, IMovieItemState> {
    render() {
        return (
            <Stack spacing={5} style={{cursor: 'pointer'}}>
                {
                    this.props.movie.poster_path && 
                    (
                        <LazyLoadImage
                            wrapperClassName='image-hover-zoom'
                            alt={this.props.movie.original_title} 
                            height={300}
                            src={`${TMDB_IMG_URL}/w342${this.props.movie.poster_path}`} />
                    )
                }
                <Text w={200} >{this.props.movie.original_title}</Text>
                <Rating value={this.props.movie.vote_average ? this.props.movie.vote_average / 2 : 0} fractions={50} readOnly/>
            </Stack>
    )}
};