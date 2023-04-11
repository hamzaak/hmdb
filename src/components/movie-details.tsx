import { useEffect, lazy, Suspense  } from "react";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectMovieDetails } from "../store/movie/details/selectors";
import { fetchMovieDetails } from "../store/movie/details/actions";
import MovieDetailsIntro from "./movie-details-intro";

const MovieDetailsInfo = lazy(() => import('./movie-details-info'));

interface IMovieDetailsProps {
    id: string;
}

export default function MovieDetails (props: IMovieDetailsProps) {
    const movieDetails = useAppSelector(selectMovieDetails);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(fetchMovieDetails(props.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <MovieDetailsIntro movieDetails={movieDetails} />
            <Suspense>
                <MovieDetailsInfo movieDetails={movieDetails} />
            </Suspense>
        </>
    )
};