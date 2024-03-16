import { Model } from 'objection';
import { BaseModel } from './base-model';
import { User } from './user';

class Movie extends BaseModel {
  static readonly tableName = 'movies';
  title!: string;
  description!: string;
  directorName!: string;
  releaseDate!: Date;
  likedBy?: User[]

  static relationMappings = {
    likedBy: {
      relation: Model.ManyToManyRelation, // we want to see the likes for each movie
      modelClass: User,
      join: {
        from: 'movies.id',
        through: {
          from: 'likes.movieId',
          to: 'likes.userId'
        },
        to: 'users.id'
      }
    }
  };
}

export { Movie };
