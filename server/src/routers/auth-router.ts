import { Router } from "express";
import {
  EmailAlreadyExistsError,
  UserInputSchema,
  UsernameAlreadyExistsError,
  UserService,
} from "../services/user-service";
import { JwtService } from "../services/jwt-service";
import { requestHandler } from "../middlewares/request-handler";
import { z } from "zod";
import { BadRequestError } from "../errors";

const authRouter = Router();
const userService = new UserService();
const jwtService = new JwtService();

authRouter.post(
  "/login",
  requestHandler(async (req, res) => {
    const { username, password } = LoginInputSchema.parse(req.body);
    const user = await userService.login(username, password);

    if (!user) {
      try {
        const result = await userService.register({ username, password });
        res.send({ registered: result.id });
      } catch (error) {
        if (error instanceof UsernameAlreadyExistsError) {
          throw new BadRequestError("Username already exists");
        }

        throw error;
      }
    }
  })
);

const LoginInputSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export { authRouter };
