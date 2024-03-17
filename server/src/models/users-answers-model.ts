import { BaseModel } from "./base-model";

export class UserAnswer extends BaseModel {
  static readonly tableName = "users_answers";
  userId!: number;
  answersId!: number;
}
