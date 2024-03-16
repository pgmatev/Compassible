import { Model, Modifiers } from "objection";
import { BaseModel } from "./base-model";

class User extends BaseModel {
  static readonly tableName = "users";
  username!: string;
  password!: string;

  static modifiers: Modifiers = {
    noPassword(query) {
      query.select("users.id", "email", "name", "username");
    },
  };
}

export { User };
