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
import { QuestionTransformer } from "../transformers/question-transformer";

const questionRouter = Router();
const questionTranformer = new QuestionTransformer();
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

export { questionRouter };
