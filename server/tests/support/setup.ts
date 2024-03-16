import knex from "knex";
import { Model } from "objection";
import knexConfig from "../../knexfile";
import { Like } from "../../src/models/like";
import { Movie } from "../../src/models/movie";
import { User } from "../../src/models/user";

const knexClient = knex(knexConfig.test);

beforeAll(async () => {
  Model.knex(knexClient);

  await knexClient.migrate.latest();
});

beforeEach(async () => {
  await Movie.query().delete();
  await User.query().delete();
  await Like.query().delete();
})

afterAll(async () => await knexClient.destroy())
