import { Movie } from "../../src/models/movie";
import { MovieService } from "../../src/services/movie-service"
import { createMovie, createUser } from "../support/factories";

describe('MovieService', () => {
    describe('insertMovie', () => {
        it('inserts movie correctly', async () => {
            const movieService = new MovieService();

            await movieService.insertMovie({ title: "Moby Dick", description: "A movie about a whale" });
    
            const movie = await Movie.query().findOne("title", "=", "Moby Dick");
            expect(movie?.description).toEqual("A movie about a whale"); //there should be a movie matching this description
        })
    })

    describe('deleteMovieById', () => {
        it('deletes the movie from the database', async () => {
            const movieService = new MovieService();
            const movie = await createMovie();

            const result = await movieService.deleteMovieById(movie.id);
            expect(result).toEqual(movie); // The deleted movie should be returned

            const deletedMovie = await Movie.query().findById(movie.id);
            expect(deletedMovie).toBeUndefined(); // The movie should no longer exist in the database
          });
    })

    describe('getMovie', () => {
        it('returns a movie matching the provided arguments', async () => {
            const movieService = new MovieService();
            const movie = await createMovie({ title:'Spider-man', releaseDate: new Date('2006-01-01') });

            const result = await movieService.getMovie({ title: 'Spider-man' });
            expect(result).toEqual(movie); // The returned movie should match the test movie
        });

        it('returns undefined if no movies match the provided arguments', async () => {
            const movieService = new MovieService();
            const result = await movieService.getMovie({ title: 'Shazham' });
            expect(result).toEqual(undefined); // The function should return undefined if no movies match
        });
    })

    describe('getMovieById', () => {
        it('returns a movie matching the provided id', async () => {
            const movieService = new MovieService();
            const movie = await createMovie({ title:'Spider-man', releaseDate: new Date('2006-01-01') });

            const result = await movieService.getMovieById(movie.id);
            expect(result).toEqual(movie); // The returned movie should match the test movie
        });

        it('returns undefined if no movies match the provided id', async () => {
            const movieService = new MovieService();
            const result = await movieService.getMovie({ title: "None" });
            expect(result).toEqual(undefined); // The function should return undefined if no movies match
        });
    })

    describe('getMoviesBasedOnLikes', () => {
        it('returns movies sorted by number of likes', async () => {
            const movieService = new MovieService();
            //Set up movies
            const movie1 = await createMovie({ title: 'Transformers' });
            const movie2 = await createMovie({ title: 'Tennet' });
            const movie3 = await createMovie({ title: 'V for Vendetta' });
            const movie4 = await createMovie({ title: 'Love' });

            //Set up users
            const user1 = await createUser();
            const user2 = await createUser({ username: "john", email: "don@don.com" });
            const user3 = await createUser({ username: "john1", email: "don1@don.com" })

            // Set up likes for the movies
            await Movie.relatedQuery('likedBy').for(movie1.id).relate(user1.id);
            await Movie.relatedQuery('likedBy').for(movie1.id).relate(user2.id);
            await Movie.relatedQuery('likedBy').for(movie1.id).relate(user3.id);
            await Movie.relatedQuery('likedBy').for(movie2.id).relate(user1.id);
            await Movie.relatedQuery('likedBy').for(movie2.id).relate(user2.id);
            await Movie.relatedQuery('likedBy').for(movie3.id).relate(user1.id);
            await Movie.relatedQuery('likedBy').for(movie3.id).relate(user2.id);

            const result = await movieService.getMoviesBasedOnLikes(1, 4);
            expect(result.results).toEqual([movie1, movie2, movie3, movie4]); // The function should return the movies in order of likes
            expect(result.total).toEqual(4); 
            //result.results is empty for some reason :(
          });
    })
})