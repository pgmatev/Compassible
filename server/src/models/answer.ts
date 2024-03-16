import { BaseModel } from "./base-model";
import { Model } from "objection";
import { QuestionModel } from "./question";

export class AnswerModel extends BaseModel {
  static readonly tableName = "answers";
  answer!: string;
  questionId!: number;

  static relationMappings = {
    answers: {
      relation: Model.BelongsToOneRelation,
      modelClass: QuestionModel,
      join: {
        from: "answers.questionId",
        to: "questions.id",
      },
    },
  };
}
