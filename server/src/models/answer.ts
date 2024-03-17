import { BaseModel } from "./base-model";
import { Model } from "objection";
import { QuestionModel } from "./question";
import { User } from "./user";

export class AnswerModel extends BaseModel {
  static readonly tableName = "answers";
  answer!: string;
  questionId!: number;
  users!: User;

  static relationMappings = {
    question: {
      relation: Model.BelongsToOneRelation,
      modelClass: QuestionModel,
      join: {
        from: "answers.questionId",
        to: "questions.id",
      },
    },
    users: {
      relation: Model.ManyToManyRelation,
      modelClass: User,
      join: {
        from: "answers.id",
        through: {
          from: "users_answers.answer_id",
          to: "users_answers.user_id",
        },
        to: "users.id",
      },
    },
  };
}
