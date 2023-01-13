import bcrypt from "bcrypt";
import logger from "../common/logger";

export function comparePassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}
