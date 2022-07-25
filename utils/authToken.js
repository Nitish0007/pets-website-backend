import jwt from "jsonwebtoken";
import { jwtSecret } from "./secrets.js";

export const signToken = (payload) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: "10h",
  });
  return token;
};

export const verifyToken = (token) => {
  const result = jwt.verify(token, jwtSecret, (err, verifiedJwt) => {
    if (err) return false;
    else return verifiedJwt;
  });
  return result;
};