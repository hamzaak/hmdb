import { Text, Stack, Grid, Title, Table } from "@mantine/core";
import { TMDB_IMG_URL } from '../config';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IMovieDetails } from "../types/movie-details";
import { IGenre } from "../types/genre";
import { ICompany } from "../types/company";
const humanizeDuration = require("humanize-duration");

interface IMovieDetailsInfoProps {
    movieDetails: IMovieDetails | null;
}

export default function MovieDetailsInfo(props: IMovieDetailsInfoProps) {
    const languageNames = new Intl.DisplayNames(['en'], {
        type: 'language'
      });

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
        <Grid mt={50} mr={30}>
            <Grid.Col md={12} lg={3}>
                <LazyLoadImage
                    alt={props.movieDetails?.original_title}
                    width="100%"
                    src={`${TMDB_IMG_URL}/w342${props.movieDetails?.poster_path}`} />
            </Grid.Col>
            <Grid.Col md={12} lg={9}>

                <Stack>
                    <Title order={3} style={{color: 'white'}}>Storyline</Title>
                    <Text>{props.movieDetails?.overview}</Text>

                    <Table>
                        <tbody>
                            <tr>
                                <td width="10%">Released</td>
                                <td>: {new Date(props.movieDetails?.release_date || (new Date())).toUTCString().replace("00:00:00 GMT", "")}</td>
                            </tr>
                            <tr>
                                <td>Runtime</td>
                                <td>: {humanizeDuration((props.movieDetails?.runtime || 0) * 1000 * 60)}</td>
                            </tr>
                            <tr>
                                <td>Budget</td>
                                <td>: {currencyFormat(props.movieDetails?.budget || 0)}</td>
                            </tr>
                            <tr>
                                <td>Revenue</td>
                                <td>: {currencyFormat(props.movieDetails?.revenue || 0)}</td>
                            </tr>
                            <tr>
                                <td>Genres</td>
                                <td>: {genreFormat(props.movieDetails?.genres || [])}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>: {props.movieDetails?.status}</td>
                            </tr>
                            <tr>
                                <td>Language</td>
                                <td>: {languageNames.of(props.movieDetails?.original_language || 'en')}</td>
                            </tr>
                            <tr>
                                <td>Production</td>
                                <td>: {productionFormat(props.movieDetails?.production_companies || [])}</td>
                            </tr>
                        </tbody>
                    </Table>

                </Stack>
            </Grid.Col>
        </Grid>
    )
};