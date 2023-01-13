import jwt from "jsonwebtoken";

export function generateJWT(user) {
  return jwt.sign({ id: user.id, email: user.email }, "secret", {
    expiresIn: 600000,
  });
}
