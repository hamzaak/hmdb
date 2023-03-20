import React from 'react';
import axios from 'axios';
import './intro.css';
import { tmdbKey, tmdbBaseUrl, tmdbImageBaseUrl } from '../../config';
import StarRatings from 'react-star-ratings';

export class Intro extends React.Component {
  state = {
    nowPlayingMovie: {}
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
        <div >
            <div className='now-playing'>
                <img src={ tmdbImageBaseUrl + '/t/p/w1280' + this.state.nowPlayingMovie.backdrop_path } width='100%' alt="#"/>
            </div>


            <div className='movie-text'> 
                <h2>{ this.state.nowPlayingMovie.original_title }</h2>
                
                <div className='mt-3'>
                    <StarRatings
                        rating={ this.state.nowPlayingMovie.vote_average ? this.state.nowPlayingMovie.vote_average / 2 : 0 }
                        starRatedColor="#61dafb"
                        starDimension="24px"
                        starSpacing="2px"
                        numberOfStars={5}
                        name='rating'
                        />
                </div>
               
                <p className='lead mt-3'>{ this.state.nowPlayingMovie.overview } </p>
            </div>

        </div>
    )
  }
}