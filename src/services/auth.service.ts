import logger from "../common/logger";
import UsersModel from "../models/user.model";
import "../common/passport";
import passport from "passport";
import { comparePassword } from "../utils/password.utils";
import { generateJWT } from "../utils/jwt.utils";

class AuthService {
  async login(ctx) {
    const user = await UsersModel.findOne({ email: ctx.email });

    if (!user) {
      throw Error("User not found");
    }
    const passwordMatched = comparePassword(user, ctx.password);
    if (passwordMatched) {
      const token = generateJWT(user);
      return { email: user.email, id: user.id, token };
    }
  }
}

export default new AuthService();
