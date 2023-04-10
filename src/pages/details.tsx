import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Stack, Title, Text, Table } from "@mantine/core";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import MovieFeature from "../components/movie-feature";
import { selectMovieDetails } from "../store/movie/details/selectors";
import { fetchMovieDetails } from "../store/movie/details/actions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { TMDB_IMG_URL } from '../config';
import { IGenre } from "../types/genre";
import { ICompany } from "../types/company";
const humanizeDuration = require("humanize-duration");


export default function Details () {
    const movieDetails = useAppSelector(selectMovieDetails);
    const dispatch = useAppDispatch();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const { id } = useParams();
    const languageNames = new Intl.DisplayNames(['en'], {
        type: 'language'
      });

    useEffect(() => {
        dispatch(fetchMovieDetails(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function currencyFormat(num: number) {
        return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }

    function genreFormat(genres: IGenre[]) {
        return Array.prototype.map.call(genres, function(item) { return item.name; }).join(", ")
    }

    function productionFormat(productions: ICompany[]) {
        return Array.prototype.map.call(productions, function(item) { return item.name; }).join(", ")
    }

    return (
        <Container fluid>
            <MovieFeature movieDetails={movieDetails} />
            <Grid mt={50} mr={30}>
                <Grid.Col md={12} lg={3}>
                    <LazyLoadImage
                        alt={movieDetails?.original_title} 
                        width="100%"
                        src={`${TMDB_IMG_URL}/w342${movieDetails?.poster_path}`} />
                </Grid.Col>
                <Grid.Col md={12} lg={9}>
                    
                    <Stack>
                        <Title order={3}>Storyline</Title>
                        <Text>{movieDetails?.overview}</Text>

                        <Table>
                            <tbody>
                                <tr>
                                    <td width="10%">Released</td>
                                    <td>: { new Date(movieDetails?.release_date || (new Date())).toUTCString().replace("00:00:00 GMT","")}</td>
                                </tr>
                                <tr>
                                    <td>Runtime</td>
                                    <td>: { humanizeDuration((movieDetails?.runtime || 0) * 1000 * 60)  }</td>
                                </tr>
                                <tr>
                                    <td>Budget</td>
                                    <td>: { currencyFormat(movieDetails?.budget || 0) }</td>
                                </tr>
                                <tr>
                                    <td>Revenue</td>
                                    <td>: { currencyFormat(movieDetails?.revenue || 0) }</td>
                                </tr>
                                <tr>
                                    <td>Genres</td>
                                    <td>: { genreFormat(movieDetails?.genres || []) }</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>: { movieDetails?.status }</td>
                                </tr>
                                <tr>
                                    <td>Language</td>
                                    <td>: { languageNames.of(movieDetails?.original_language || 'en') }</td>
                                </tr>
                                <tr>
                                    <td>Production</td>
                                    <td>: { productionFormat(movieDetails?.production_companies || []) }</td>
                                </tr>
                            </tbody>
                        </Table>

                    </Stack>
                </Grid.Col>
            </Grid>
        </Container>
    )
};