import { useEffect, useState } from "react";
import { Text, Stack, Rating, ActionIcon } from "@mantine/core";
import { TMDB_IMG_URL } from '../config';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IMovie } from '../types/movie';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useAppDispatch } from "../store/hooks";
import { favoriteMovieAsync, isFavoriteMovieAsync, unfavoriteMovieAsync } from "../store/favorites/actions";
import { Link } from "react-router-dom";

interface IMovieItemProps {
    movie: IMovie;
}

export default function MovieItem(props: IMovieItemProps) {
    const [isFavorite, setFavorite] = useState(false);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(isFavoriteMovieAsync(props.movie))
        .then((res: any) => {
            //console.log(`movie:${props.movie.original_title}, isFavorite:${res.payload.isFavorite}`);
            setFavorite(res.payload.isFavorite)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    
    function onFavoriteClick(movie: IMovie) {
        //console.log(movie);
        setFavorite(!isFavorite);
        isFavorite ? dispatch(unfavoriteMovieAsync(movie)) : dispatch(favoriteMovieAsync(movie));
    }

    return (
        <Link to={`/details/${props.movie.id}`} className="disable-link-style">
            <Stack spacing={5} style={{cursor: 'pointer'}}>
                {
                    props.movie.poster_path && 
                    (
                        <div style={{position: 'relative'}}>
                            <LazyLoadImage
                                wrapperClassName='image-hover-zoom'
                                alt={props.movie.original_title} 
                                width="100%"
                                src={`${TMDB_IMG_URL}/w342${props.movie.poster_path}`} />

                            <Stack style={{position: 'absolute', top: '0.5rem', right: '1rem'}}>
                                <ActionIcon onClick={() => onFavoriteClick(props.movie)}>
                                    {
                                        isFavorite 
                                        ? ( <AiFillHeart size="2rem" color='#e03131' /> )
                                        : ( <AiOutlineHeart size="2rem" color='#e03131' /> )
                                    }
                                    
                                </ActionIcon>
                            </Stack>
                        </div>
                    )
                }
                <Text w={200} >{props.movie.original_title}</Text>
                <Rating value={props.movie.vote_average ? props.movie.vote_average / 2 : 0} fractions={50} readOnly/>
            </Stack>
        </Link>
)
};