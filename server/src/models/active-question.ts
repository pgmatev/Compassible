import { BaseModel } from "./base-model";
import { Model } from "objection";
import { QuestionModel } from "./question";

export class ActiveQuestionModel extends BaseModel {
  static readonly tableName = "active_question";
  questionId!: number;
  expirationTime!: Date;

  static relationMappings = {
    answers: {
      relation: Model.BelongsToOneRelation,
      modelClass: QuestionModel,
      join: {
        from: "questions.id",
        to: "answers.questionId",
      },
    },
  };
}
