import React, { useState } from 'react';
import { Text, Container, Grid, Stack, Title, Loader, Button, Input } from "@mantine/core";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import MovieListItem from "../components/movie-list-item";
import { BsSearch } from "react-icons/bs";
import {
    selectSearchMovies,
    selectSearchMoviesPage,
    //selectSearchMoviesQuery,
    selectSearchMoviesStatus,
    selectSearchMoviesTotalPages,
    selectSearchMoviesTotalResults
} from '../store/movie/search/selectors';
import { fetchSearchMovies } from '../store/movie/search/actions';

export default function SearchMovies() {
    const searchMoviesPage = useAppSelector(selectSearchMoviesPage);
    const searchMovies = useAppSelector(selectSearchMovies);
    const searchMoviesStatus = useAppSelector(selectSearchMoviesStatus);
    const searchMoviesTotalPages = useAppSelector(selectSearchMoviesTotalPages);
    const searchMoviesTotalResults = useAppSelector(selectSearchMoviesTotalResults);
    //const searchMoviesQuery = useAppSelector(selectSearchMoviesQuery);

    const [query, setQuery] = useState('');
    const dispatch = useAppDispatch();

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        dispatch(fetchSearchMovies({ query: e.target.value, page: 1 }));
    }

    function loadMoreClick() {
        dispatch(fetchSearchMovies({ query: query, page: searchMoviesPage + 1}));
    }

    return (
        <Container fluid mr={30}>
            <Stack>
                <Input
                    mt={50}
                    icon={<BsSearch />}
                    placeholder="Search movies"
                    onChange={onSearchChange}
                    rightSection={
                        <>
                            {
                                searchMoviesStatus === 'loading' && (
                                    <Loader color='red' size='sm' />
                                )
                            }
                        </>
                    } />

                <Title order={2}>Search Result</Title>
                <Text color="gray">{searchMoviesTotalResults} items</Text>
                <Grid>
                    {searchMovies?.map(function (movie, index) {
                        return <MovieListItem key={index} movie={movie} />;
                    })}
                </Grid>

                {
                    searchMoviesPage !== searchMoviesTotalPages &&
                    (
                        <Button
                            variant="gradient"
                            gradient={{ from: 'pink', to: 'red' }}
                            onClick={loadMoreClick}>
                            {
                                searchMoviesStatus === 'loading' ? (
                                    <Loader variant="dots" color="white" />
                                ) :
                                    (
                                        <Text>Load more</Text>
                                    )
                            }
                        </Button>
                    )
                }
            </Stack>
        </Container>
    )
};