import { User } from "../models/user";

export class UserTransformer {
  transform(user: User) {
    return {
      id: user.id,
      username: user.username,
    };
  }
}
