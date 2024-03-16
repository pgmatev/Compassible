import { Movie } from "../../services/movie-service";
import { MovieCardList } from "./MovieCardList";

interface MovieLibraryProps {
    movies: Movie[]
}

export function ListMovieLibrary({ movies }: MovieLibraryProps) {
    return (
        <div>
            {...movies.map(movie => <MovieCardList movie= {movie}></MovieCardList>)}
        </div>
    )
}