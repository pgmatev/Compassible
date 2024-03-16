import { knex } from 'knex';
import { Model, ModelOptions, QueryContext } from 'objection';
import knexConfig from '../knexfile';
import { config } from './config';

import express, { json } from 'express';
import { userRouter } from './routers/user-router';
import { authRouter } from './routers/auth-router';

//Connection to the database
const knexClient = knex(knexConfig.development);
Model.knex(knexClient);

//Server
const app = express();
const port = config.get('port');

app.use(json());

// app.use('/movies', movieRouter);
app.use('/users', userRouter);
app.use('/', authRouter);


app.listen(port);
console.log('Server started on port ', port);

