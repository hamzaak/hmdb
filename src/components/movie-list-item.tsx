import React from 'react';
import { Grid } from "@mantine/core";
import MovieItem from './movie-item';
import { IMovie } from '../types/movie';

interface IMovieListItemProps {
    movie: IMovie;
}

interface IMovieListItemState {
    s_width: number;
}

export default class MovieListItem extends React.Component<IMovieListItemProps, IMovieListItemState> {
    constructor(props: IMovieListItemProps) {
        super(props);
    
        this.state = {
            s_width: window.innerWidth
        };

        //bu kod satırı olmazsa button state değerini değiştiremez!
        this.handleResize = this.handleResize.bind(this);
        window.addEventListener('resize', this.handleResize)
    }

    handleResize() {
        this.setState({ s_width: window.innerWidth });
    }

    render() {
        return (
            <Grid.Col span={
                this.state.s_width < 480 ? 12 : (
                    this.state.s_width < 768 ? 6 : (
                        this.state.s_width < 1024 ? 4: 2
                    ))}>
                <MovieItem movie={this.props.movie} />
            </Grid.Col>
    )}
};