import { QuestionModel } from "../models/question";

export class QuestionTransformer {
  transformWithAnswers(question: QuestionModel) {
    return {
      ...question,
      answers: question.answers,
    };
  }
}
