import {
  Model,
  Modifiers,
  RelationMappings,
  RelationMappingsThunk,
} from "objection";
import { BaseModel } from "./base-model";
import { AnswerModel } from "./answer";

class User extends BaseModel {
  static readonly tableName = "users";
  username!: string;
  password!: string;
  answers!: AnswerModel[];

  static relationMappings = {
    answers: {
      relation: Model.ManyToManyRelation,
      modelClass: AnswerModel,
      join: {
        from: "users.id",
        through: {
          from: "users_answers.user_id",
          to: "users_answers.answer_id",
        },
        to: "answers.id",
      },
    },
  };

  static modifiers: Modifiers = {
    noPassword(query) {
      query.select("users.id", "email", "name", "username");
    },
  };
}

export { User };
