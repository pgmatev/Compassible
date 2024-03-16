import convict from "convict";
import dotenv from 'dotenv';
dotenv.config();

const config = convict({
  db: {
    user: {
      doc: "DB user",
      env: "MOVIE_PROJECT_DB_USER",
      default: "postgres",
    },
    password: {
      doc: "DB Password",
      env: "MOVIE_PROJECT_DB_PASSWORD",
      default: "postgres",
    },
    host: {
      env: "MOVIE_PROJECT_DB_HOST",
      default: "localhost",
    },
    port: {
      env: "MOVIE_PROJECT_DB_PORT",
      format: "port",
      default: 5432,
    },
    database: {
      doc: "DB database name",
      env: "MOVIE_PROJECT_DB_NAME",
      default: "movies",
    },
    testDatabase: {
      doc: "DB database name for testing",
      env: "MOVIE_PROJECT_TEST_DB_NAME",
      default: "movies_testing",
    },
  },
  port: {
    env: "MOVIE_PROJECT_SERVER_PORT",
    format: "port",
    default: 3000,
  },
  jwt: {
    privateKey: {
      env: "MOVIE_PROJECT_JWT_SECRET",
      default: "movie_private_key",
    },
    expiryTime: {
      env: "MOVIE_PROJECT_JWT_EXP_TIME",
      default: "1h",
    },
  },

});

config.validate();

export { config };
