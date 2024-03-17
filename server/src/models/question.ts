import { AnswerModel } from "./answer";
import { BaseModel } from "./base-model";
import { Model } from "objection";

export class QuestionModel extends BaseModel {
  static readonly tableName = "questions";
  question!: string;
  answers!: AnswerModel[];

  static relationMappings = {
    answers: {
      relation: Model.HasManyRelation,
      modelClass: AnswerModel,
      join: {
        from: "questions.id",
        to: "answers.questionId",
      },
    },
  };
}
