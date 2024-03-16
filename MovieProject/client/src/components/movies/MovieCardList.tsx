import { useState } from "react";
import { Movie } from "../../services/movie-service";
import { Button, Card, Content, Footer } from "react-bulma-components";

import { Link } from "react-router-dom";

interface MovieProp {
    movie: Movie
}

export function MovieCardList({ movie }: MovieProp) {
    const [isExpanded, setIsExpanded] = useState(false);


    return (
        <Card mb={3}>
            <Card.Header>
                <Card.Header.Title>
                    <Link to={"/movies/" + movie.id}>{movie.title}</Link>  
                </Card.Header.Title>
                <Card.Header.Icon>
                    <Button text={true} onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? "Hide" : "Show"}
                    </Button>
                </Card.Header.Icon>
            </Card.Header>
            {isExpanded &&
            <>
                <Card.Content>
                    <Content>
                     {movie.description? movie.description : "No description"}
                    </Content>
                </Card.Content>
                <Card.Footer>
                    <Card.Footer.Item>Released: {movie.releaseDate ? movie.releaseDate : "Unknown release date"}</Card.Footer.Item>
                    <Card.Footer.Item>Directed by: {movie.directorName ? movie.directorName : "Unknown director"}</Card.Footer.Item>
                </Card.Footer>
            </>}
        </Card>
        )
}