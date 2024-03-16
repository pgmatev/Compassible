import { Router } from "express"
import { BadRequestError, ForbiddenError, NotFoundError, UnauthorizedError } from "../errors";
import { requestHandler } from "../middlewares/request-handler";
import { EmailAlreadyExistsError, UserInputSchema, UsernameAlreadyExistsError, UserService, UserUpdateSchema } from "../services/user-service"
import { UserTransformer } from "../transformers/user-transformer";
import { z } from "zod";
import { authMiddleware, getUserFromLocals } from "../middlewares/auth";


const userRouter = Router();
const userService = new UserService();
const userTransformer = new UserTransformer();

userRouter.get('/:id', requestHandler(async (req, res) => {
  const { id } = req.params;

  const idNumber = Number(id);

  if (Number.isNaN(idNumber)) {
    throw new BadRequestError("Id should be a number");
  }

  const user = await userService.getUserById(idNumber);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  res.status(200).send(userTransformer.transform(user));
}))

userRouter.patch('/:id', authMiddleware, requestHandler(async (req, res) => {
  const { id } = req.params;
  const idNumber = Number(id);
  const loggedUserId = getUserFromLocals(res).id;

  if (idNumber != loggedUserId) {
    throw new ForbiddenError("You do not have the permission");
  }

  if (Number.isNaN(idNumber)) {
    throw new BadRequestError("Id should be a number");
  }

  let userInput = UserUpdateSchema.parse(req.body);

  try {
    const updatedUser = await userService.updateUserById(idNumber, userInput);
    res.status(200).send({message: `Updated user ${updatedUser}`});
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      throw new BadRequestError("Email already exists");
    }

    if (error instanceof UsernameAlreadyExistsError) {
        throw new BadRequestError("Username already exists");
    }

    throw error;
  }

}))


export { userRouter };