import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mantine/core";
import MovieDetails from "../components/movie-details";

const MovieCast = lazy(() => import('../components/movie-cast'));

export default function Details () {
    
    const { id } = useParams();

    return (
        <Container fluid>
            <MovieDetails id={id || ''} />
            <Suspense>
                <MovieCast id={id || ''} />
            </Suspense>
        </Container>
    )
};