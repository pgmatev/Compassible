import { Model, Modifiers } from 'objection';
import { BaseModel } from './base-model';
import { Movie } from './movie';

class User extends BaseModel {
  static readonly tableName = 'users';
  username!: string;
  name!: string;
  email!: string;
  password!: string;
  likedMovies?: Movie[]; 

  static modifiers: Modifiers = {
    noPassword(query) {
      query.select('users.id', 'email', 'name', 'username')
    }
  }


  static relationMappings = {
    likedMovies: {
      relation: Model.ManyToManyRelation, // we want to see the liked movies for every user
      modelClass: Movie,
      join: {
        from: 'user.id',
        through: {
          from: 'likes.userId',
          to: 'likes.movieId'
        },
        to: 'movies.id'
      }
    }
  };
}

export { User };
