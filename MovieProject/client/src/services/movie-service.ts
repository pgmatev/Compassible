export interface Movie {
    id: number,
    title: string,
    releaseDate?: string,
    directorName?: string,
    description?: string
};

const movies: Movie[] = [
    { 
        id: 1,
        title: "Transformers", 
        releaseDate: "2006", 
        directorName: "Michael Bay",
         description:"Autobots, roll out! CHKK CHRR CHRRKK" 
    },
    { 
        id: 2,
        title: "Shrek", 
        releaseDate: "2001",
         description:"Extremely, even annoyngly, totally unnecessary long description that is here only to annoy you and waste your time. I do believe you won't stop reading though, so I will provide you with the answer to the universe" 
    },
    { 
        id: 3,
        title: "Shawshank", 
        releaseDate: "1990" 
    }
];

export class MovieService {
    getAllMovies(query: string) {
        return new Promise<Movie[]>((resolve) => {
            setTimeout(() => resolve(movies.filter(
                                movie => movie.title
                                .toLowerCase()
                                .includes(query.toLowerCase()))), 
                    2);
        })
    }

    loadMovie(movieId: number) {
        return new Promise<Movie | undefined>((resolve) => {
            setTimeout(() => resolve(movies.find(movie => movie.id == movieId)), 2);
        })
    }
}