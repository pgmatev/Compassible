import { GridMovieLibrary } from "../components/movies/GridMovieLIbrary";
import { ListMovieLibrary } from "../components/movies/ListMovieLibrary";
import { useState, useEffect, useCallback } from 'react';
import { Movie, MovieService } from "../services/movie-service";
import { useAsync } from "../hooks/useAsync";
import { useSearchParams } from "react-router-dom";
import { Container, Button, Form, Columns } from "react-bulma-components";

const { Input } = Form;

const movieService = new MovieService;

export function MovieLibrary() {

    const [movies, setMovies] = useState<Movie[]>([]);

    const [searchParams, setSearchParams] = useSearchParams();

    const isGrid = searchParams.get('view') === 'grid';
    const searchQuery = searchParams.get('query') ?? '';

    const onViewChange = useCallback(() => {
        searchParams.set('view', isGrid ? 'list' : 'grid');
        setSearchParams(searchParams);

    }, [isGrid, searchParams, setSearchParams]);


    const onSearchInput = useCallback((input: string) => {
        searchParams.set('query', input);
        setSearchParams(searchParams);

    }, [searchQuery, searchParams, setSearchParams]);


    useAsync(() => movieService.getAllMovies(searchQuery), setMovies, [searchQuery]);

    return (
        <Container textAlign={"center"}>
            <p className="title">Available Movies</p>
            
            <Columns>
            <Columns.Column size={"four-fifths"}>
                <Input color={'primary'} value={searchQuery} onChange={e => onSearchInput(e.target.value)} type="text" placeholder="Search..."/>
            </Columns.Column>
            <Columns.Column >
                <Button color={"light"} onClick={() => onViewChange()}>Change view</Button>
            </Columns.Column>
            </Columns>

            <Container my={6}>
                { isGrid
                ? <GridMovieLibrary movies= {movies}/>
                : <ListMovieLibrary movies= {movies}/>}
            </Container>
        </Container>
        )

}