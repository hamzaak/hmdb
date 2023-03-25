/*import React from 'react';
import axios from 'axios';
import './home.css';
import { tmdbKey, tmdbBaseUrl, tmdbImageBaseUrl } from '../../../hmdb/src/config';
import StarRatings from 'react-star-ratings';
import MovieItem from '../../../hmdb/src/components/movie-item/movie-item';

export default class Home extends React.Component {
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
            <>
                <div className='now-playing'>
                    <img src={tmdbImageBaseUrl + '/t/p/w1280' + this.state.nowPlayingMovie.backdrop_path} width='100%' alt="#" />
                </div>


                <div className='movie-text'>
                    <h2>{this.state.nowPlayingMovie.original_title}</h2>

                    <div className='mt-3'>
                        <StarRatings
                            rating={this.state.nowPlayingMovie.vote_average ? this.state.nowPlayingMovie.vote_average / 2 : 0}
                            starRatedColor="#61dafb"
                            starDimension="24px"
                            starSpacing="2px"
                            numberOfStars={5}
                            name='rating'
                        />
                    </div>

                    <p className='lead mt-3'>{this.state.nowPlayingMovie.overview} </p>
                </div>

                <div className="container text-center my-3">

    <div className="row mx-auto my-auto justify-content-center">
			<div className="carousel slide" data-interval="false" data-bs-ride="carousel">
				<div className="carousel-inner" role="listbox">
					<div className="carousel-item active">
						<div className="col-md-3">
							<div className="card">
								<div className="card-img">
									<img src="https://via.placeholder.com/700x500.png/CB997E/333333?text=1" className="img-fluid" alt="#" />
								</div>
								<div className="card-img-overlay">Slide 1</div>
							</div>
						</div>
					</div>
					<div className="carousel-item">
						<div className="col-md-3">
							<div className="card">
								<div className="card-img">
									<img src="https://via.placeholder.com/700x500.png/DDBEA9/333333?text=2" className="img-fluid" alt="#" />
								</div>
								<div className="card-img-overlay">Slide 2</div>
							</div>
						</div>
					</div>
					<div className="carousel-item">
						<div className="col-md-3">
							<div className="card">
								<div className="card-img">
									<img src="https://via.placeholder.com/700x500.png/FFE8D6/333333?text=3" className="img-fluid" alt="#" />
								</div>
								<div className="card-img-overlay">Slide 3</div>
							</div>
						</div>
					</div>
					<div className="carousel-item">
						<div className="col-md-3">
							<div className="card">
								<div className="card-img">
									<img src="https://via.placeholder.com/700x500.png/B7B7A4/333333?text=4" className="img-fluid" alt="#" />
								</div>
								<div className="card-img-overlay">Slide 4</div>
							</div>
						</div>
					</div>
					<div className="carousel-item">
						<div className="col-md-3">
							<div className="card">
								<div className="card-img">
									<img src="https://via.placeholder.com/700x500.png/A5A58D/333333?text=5" className="img-fluid" alt="#" />
								</div>
								<div className="card-img-overlay">Slide 5</div>
							</div>
						</div>
					</div>
					<div className="carousel-item">
						<div className="col-md-3">
							<div className="card">
								<div className="card-img">
									<img src="https://via.placeholder.com/700x500.png/6B705C/eeeeee?text=6" className="img-fluid" alt="#" />
								</div>
								<div className="card-img-overlay">Slide 6</div>
							</div>
						</div>
					</div>
				</div>
				<a className="carousel-control-prev bg-transparent w-aut" href="#recipeCarousel" role="button" data-bs-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
				</a>
				<a className="carousel-control-next bg-transparent w-aut" href="#recipeCarousel" role="button" data-bs-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
				</a>
			</div>
		</div>	
                </div>
                <div>
                    <MovieItem name="Deneme" />
                </div>
            </>
        )
    }
}
*/