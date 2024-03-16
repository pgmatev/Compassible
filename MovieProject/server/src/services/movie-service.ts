import { UniqueViolationError } from 'objection';
import { z } from 'zod';
import { BadRequestError } from '../errors';

import { Movie } from '../models/movie'
import { User } from '../models/user';

export const MovieInputSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    directorName: z.string().optional(),
    releaseDate: z.date().optional()
})

type MovieInput = z.infer<typeof MovieInputSchema>;

export class MovieAlreadyExistsError extends Error {}

export class MovieService {
    insertMovie(movieParams: MovieInput ) {
        return Movie.query().insert(movieParams)
    }
    
    deleteMovieById(id: number) {
        return Movie.query().deleteById(id).returning('*');
    }
    
    getMovie(args: Partial<MovieInput>) {
        return Movie.query().select('*').where(args).first();
    }

    getMovieById(id:number) {
        return Movie.query().findById(id);
    }
    
    getMoviesBasedOnLikes(page: number, size: number) {
        return Movie.query().select('movies.*', Movie.relatedQuery('likedBy').count().as('likesCount'))
        .orderBy('likesCount', 'desc')
        .page(page, size)
    }

    updateMovieById(id: number, args: Partial<MovieInput>) {
        return Movie.query().findById(id).patch(args);
    }

    getMovieWithLikes(id: number) {

        return Movie.query().findById(id).withGraphFetched('likedBy');
    }

    likeMovie(movieId: number, user: Partial<User>) {
        return Movie.relatedQuery('likedBy').for(movieId).relate(user);
    }
}