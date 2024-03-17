import { Server } from "socket.io";

declare global {
  declare namespace Express {
    export interface CustomLocals {
      io: Server;
    }
    export interface Request {
      locals: CustomLocals;
    }
  }
}
