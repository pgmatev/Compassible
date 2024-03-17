import { Router } from "express";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../errors";
import { requestHandler } from "../middlewares/request-handler";
import {
  EmailAlreadyExistsError,
  UsernameAlreadyExistsError,
  UserUpdateSchema,
} from "../services/user-service";
import { authMiddleware, getUserFromLocals } from "../middlewares/auth";
import { QuestionService } from "../services/active-question-service";
import { z } from "zod";
import { User } from "../models/user";
import { AnswerModel } from "../models/answer";

const questionRouter = Router();
const questionService = new QuestionService();

questionRouter.get(
  "/",
  requestHandler(async (req, res) => {
    const activeQuestion = await questionService.getActiveQuestion();

    const question = await questionService.getQuestionById(
      activeQuestion.questionId
    );

    if (!question) {
      throw new NotFoundError("Question not found");
    }

    res.send(question);
  })
);

questionRouter.post(
  "/",
  requestHandler(async (req, res) => {
    const { userId, answerId } = req.body;

    const user = await User.query().findById(Number(userId));
    const answer = await AnswerModel.query().findById(Number(answerId));

    if (!user || !answer) {
      throw new NotFoundError("User or Answer not found!");
    }

    await user.$relatedQuery("answers").relate(answer);


    // THIS SHOULD BE IN ANOTHER SERVIVE
    // const similarUser = await User.query()
    //   .whereExists(User.relatedQuery("answers").where("id", answerId))
    //   .first();

    // if (similarUser) {
    //   sessionService.createSession(user, similarUser);
    // }
    // else {

    // }

    res.send({ message: "successful" });
  })
);

// const AnswerInputSchema = z.object({
//   userId: z.number(),
//   answerId: z.number(),
// });

export { questionRouter };
