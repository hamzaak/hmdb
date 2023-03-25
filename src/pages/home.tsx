import React from 'react';
import axios from 'axios';
import './home.css';
import { Text, Stack, Container, Image, Overlay, Title, Rating, Grid } from "@mantine/core";
import { tmdbKey, tmdbBaseUrl, tmdbImageBaseUrl } from '../config';
import { Movie } from '../models/movie';

interface IHomeProps {
}

interface IHomeState {
    nowPlayingMovie?: Movie;
}

export default class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
    
        this.state = {
            nowPlayingMovie: {}
        };
      }
    

    componentDidMount() {
        axios.get(`${tmdbBaseUrl}/movie/now_playing?api_key=${tmdbKey}`)
            .then(res => {
                const nowPlayingMovie = res.data.results[0];
                this.setState({ nowPlayingMovie });
            })
    }

    render() {
        return (
            <Container fluid>
                <Grid>
                    <Grid.Col span={2}></Grid.Col>
                    <Grid.Col span="auto">
                        <Container fluid className='now-playing' style={{padding:0, margin:0}}>
                            {
                                this.state.nowPlayingMovie && 
                                (
                                    <Image mx="auto" src={tmdbImageBaseUrl + '/t/p/w1280' + this.state.nowPlayingMovie?.backdrop_path} alt="Latest Movie" />
                                )
                            }
                        </Container>
                    </Grid.Col>
                </Grid>

                <Overlay opacity={0} style={{marginLeft: '6rem'}}>
                    <Stack align="flex-start" justify="center" style={{height: '100%', width: '50%'}}>
                        <Title order={2}>{this.state.nowPlayingMovie?.original_title}</Title>
                        <Rating value={this.state.nowPlayingMovie?.vote_average ? this.state.nowPlayingMovie?.vote_average / 2 : 0} fractions={50} readOnly/>
                        <Text ta="left" fz="lg">
                            {this.state.nowPlayingMovie?.overview}
                        </Text>
                    </Stack>
                </Overlay>
            </Container>
    )}
};