import { Text, Stack, Grid, Title } from "@mantine/core";
import { Carousel } from '@mantine/carousel';
import { TMDB_IMG_URL } from '../config';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { selectMovieCredits } from "../store/movie/credits/selectors";
import { fetchMovieCredits } from "../store/movie/credits/actions";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface IMovieCastProps {
    id: string;
}

export default function MovieCast (props: IMovieCastProps) {
    const credits = useAppSelector(selectMovieCredits);
    const dispatch = useAppDispatch();

    useEffect(() => {

        dispatch(fetchMovieCredits(props.id))
            .then(res => {
                console.log(res);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <Stack mt={30}>
            <Grid>
                <Grid.Col span="content">
                    <Title order={3} style={{color: 'white'}}>Cast</Title>
                </Grid.Col>
            </Grid>
            
            <Carousel
                mr={30}
                slideSize={ "20%"}
                slideGap="xs"
                align="start"
                slidesToScroll={4}>
                { credits && credits.cast.map(function(item, index){
                    return <Carousel.Slide key={index}>
                            <Stack spacing={0}>
                                <LazyLoadImage
                                    wrapperClassName='image-hover-zoom'
                                    alt={item.name} 
                                    width="100%"
                                    src={ item.profile_path ? `${TMDB_IMG_URL}/w342${item.profile_path}` : 'https://via.placeholder.com/342x513/cccccc/969696?text=No+Image'} />
                                <Text w={200} style={{color: 'white'}} mt={5}>{item.name}</Text>
                                <Text w={200} >{item.character}</Text>
                            </Stack>
                        </Carousel.Slide>;
                })}
            </Carousel>
        </Stack>
    ) 
};