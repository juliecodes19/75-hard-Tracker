const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const { ACCESS_TOKEN_SECRET } = process.env;

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = {
  createAccessToken,
};
