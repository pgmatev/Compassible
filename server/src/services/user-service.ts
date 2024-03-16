import { User } from "../models/user";
import { z } from "zod";
import bcrypt from "bcrypt";
import { BcryptService } from "./bcrypt-sercive";
import { UniqueViolationError } from "objection";
import { BadRequestError } from "../errors";

export const UserInputSchema = z.object({
  username: z.string().min(3).toLowerCase(),
  email: z
    .string()
    .refine((value) => value.includes("@"), "Email must contain @"),
  password: z.string().min(4),
  name: z.string().min(2).optional(),
});

type UserInput = z.infer<typeof UserInputSchema>;

export const UserUpdateSchema = z.object({
  username: z.string().min(3).toLowerCase().optional(),
  email: z
    .string()
    .refine((value) => value.includes("@"), "Email must contain @")
    .optional(),
  password: z.string().min(4).optional(),
  name: z.string().min(2).optional(),
});

type UserUpdate = z.infer<typeof UserUpdateSchema>;

const bcryptService = new BcryptService();

export class EmailAlreadyExistsError extends Error {}
export class UsernameAlreadyExistsError extends Error {}

export class UserService {
  async register(args: { username: string; password: string }) {
    const hashedPassword = await bcryptService.hash(args.password);
    try {
      return await User.query()
        .insertAndFetch({
          username: args.username,
          password: hashedPassword,
        })
        .modify("noPassword");
    } catch (error) {
      if (
        error instanceof UniqueViolationError &&
        error.constraint == "users_username_unique"
      ) {
        throw new UsernameAlreadyExistsError();
      }

      throw error;
    }
  }

  async login(username: string, password: string) {
    const user = await User.query().findOne({ username });

    if (!user) {
      return undefined;
    }

    const passwordMatch = await bcryptService.compare(password, user.password);

    if (!passwordMatch) {
      return undefined;
    }

    return user;
  }

  async getUserById(id: number) {
    return await User.query().findById(id);
  }

  async updateUserById(id: number, args: Partial<UserInput>) {
    if (args.password) {
      args.password = await bcryptService.hash(args.password);
    }
    try {
      return await User.query().findById(id).patch(args);
    } catch (error) {
      if (
        error instanceof UniqueViolationError &&
        error.constraint == "users_email_unique"
      ) {
        throw new EmailAlreadyExistsError();
      }

      if (
        error instanceof UniqueViolationError &&
        error.constraint == "users_username_unique"
      ) {
        throw new UsernameAlreadyExistsError();
      }

      throw error;
    }
  }
}
