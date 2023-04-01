import React, { useState } from 'react';
import { Text, Container, Grid, Stack, Title, Loader, Button, Input } from "@mantine/core";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { searchMoviesAsync } from "../store/actions/movieSearchActions"; 
import { selectSearchResult, selectSearchResultStatus } from "../store/reducers/movieSearchReducer";
import MovieListItem from "../components/movieListItem";
import { BsSearch } from "react-icons/bs";

export default function SearchMovies () {
    const response = useAppSelector(selectSearchResult);
    const responseStatus = useAppSelector(selectSearchResultStatus);
    const [query, setQuery] = useState('');
    const dispatch = useAppDispatch();
    
    
    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        dispatch(searchMoviesAsync({query: e.target.value, page: response.last_page}));
        //console.log(e.target.value);

    }

    function loadMoreClick() {
        console.log(query);
        dispatch(searchMoviesAsync({query: query, page: response.last_page}));
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
                                responseStatus === 'loading' && (
                                    <Loader color='red' size='sm' />
                                )
                            }
                        </>
                      } />
                
                <Title order={2}>Search Result</Title>
                <Text color="gray">{response.total_results} items</Text>

                

                <Grid>
                    {response.movies?.map(function(movie, index){
                        return <MovieListItem key={index} movie={movie} />;
                    })}
                </Grid>

                {
                    response.last_page !== response.total_pages && 
                    (
                        <Button 
                            variant="gradient" 
                            gradient={{ from: 'pink', to: 'red' }}  
                            onClick={loadMoreClick}>
                                {
                                    responseStatus === 'loading' ? (
                                        <Loader variant="dots" color="white"/>
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