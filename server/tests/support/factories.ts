import { Movie } from "../../src/models/movie"
import { User } from "../../src/models/user"

export function createUser(data: Partial<User> = {}) {
  return User.query().insertAndFetch({
    username: 'pgmatev',
    email: 'pg@matev.com',
    password: '7777',

    ...data
  })
}

export async function createMovie(data: Partial<Movie> = {}) {

  return Movie.query().insertAndFetch({
    title: 'The Emoji Movie',

    ...data
  })
}

