import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { Movie, MovieService } from "../services/movie-service";

const movieService = new MovieService();

export function MoviePage() {
    const params = useParams();

    const [movie, setMovie] = useState<Movie>();
  
    useAsync(() => movieService.loadMovie(Number(params.id)), setMovie, [params.id]);
  
    return (
      <div>
        {movie ? movie.title : "No movie found"}
      </div>
    );
  
}