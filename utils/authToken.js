const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./secrets.js");

module.exports.signToken = (payload) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: "10h",
  });
  return token;
};

module.exports.verifyToken = (token) => {
  const result = jwt.verify(token, jwtSecret, (err, verifiedJwt) => {
    if (err) return false;
    else return verifiedJwt;
  });
  return result;
};