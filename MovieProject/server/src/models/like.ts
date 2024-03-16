import { Model } from 'objection';
import { BaseModel } from './base-model';
import { Movie } from './movie';
import { User } from './user'; 

class Like extends BaseModel {
  static readonly tableName = 'likes';
  userId!: number;
  movieId!: number;
  movie?: Movie;
  user?: User;

}

export { Like };
