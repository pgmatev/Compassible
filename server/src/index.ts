import { knex } from "knex";
import { Model, ModelOptions, QueryContext } from "objection";
import knexConfig from "../knexfile";
import { config } from "./config";

import express, { json } from "express";
import { userRouter } from "./routers/user-router";
import { authRouter } from "./routers/auth-router";
import { questionRouter } from "./routers/question-router";
import http from "http";
import * as socketIo from "socket.io";

//Connection to the database
const knexClient = knex(knexConfig.development);
Model.knex(knexClient);

//Server
const app = express();
const server = http.createServer(app);
const port = config.get("port");

//Socket
const io = new socketIo.Server(server);
io.on("connection", () => {
  console.log("Connected");
});

app.use(json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  res.locals.io = io;
  next();
});

app.use("/users", userRouter);
app.use("/questions", questionRouter);
app.use("/", authRouter);

app.listen(port);
console.log("Server started on port ", port);
