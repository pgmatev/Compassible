
import { Movie } from "../../services/movie-service";
import { MovieCard } from "./MovieCard";
import { Columns } from "react-bulma-components";

interface MovieLibraryProps {
    movies: Movie[]
}

export function GridMovieLibrary({ movies }: MovieLibraryProps) {
    return (
        <Columns multiline={true}>
            {movies.map(movie =>
                <Columns.Column size={"one-third"}>
                    <MovieCard movie= {movie}></MovieCard>
                </Columns.Column>
            )}
        </Columns>
    )
}