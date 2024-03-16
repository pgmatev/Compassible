import { Card } from "react-bulma-components"
import { Link } from "react-router-dom"
import { Movie } from "../../services/movie-service"

interface MovieProp {
    movie: Movie
}

export function MovieCard({ movie }: MovieProp) {
    return (        
    <Card>
        <Card.Header>
            <Card.Header.Title>
                <Link to="/movies">{movie.title}</Link>
            </Card.Header.Title>
        </Card.Header>
        <Card.Content>
            <p>
                Released: {movie.releaseDate ? movie.releaseDate : "Unknown release date"}
            </p>
            <p>
                Director: {movie.directorName ? movie.directorName : "Unknown director name"}
            </p>
            <p>
                {movie.description ? movie.description : "No description"}
            </p>
        </Card.Content>
    </Card>)

    
}