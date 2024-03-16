import { ActiveQuestionModel } from "../models/active-question";
import { QuestionModel } from "../models/question";

export class QuestionService {
  async getQuestionById(questionId: number) {
    return await QuestionModel.query()
      .findById(questionId)
      .withGraphFetched("answers");
  }

  private async generateQuestion() {
    const question = await QuestionModel.query()
      .orderByRaw("RANDOM()")
      .limit(1)
      .first();

    await ActiveQuestionModel.query().delete();
    return await ActiveQuestionModel.query().insert({
      questionId: question?.id,
      expirationTime: new Date(new Date().getTime() + 10 * 60000),
    });
  }

  async getActiveQuestion() {
    const activeQuestion = await ActiveQuestionModel.query().first();

    if (
      !activeQuestion ||
      activeQuestion.expirationTime.getTime() <= new Date().getTime()
    ) {
      console.log("GENERATING");
      return this.generateQuestion();
    }

    return activeQuestion;
  }
}
