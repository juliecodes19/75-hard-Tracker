const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const { ACCESS_TOKEN_SECRET } = process.env;

const createAccessToken = (payload) => {
  console.log("access token", ACCESS_TOKEN_SECRET);
  return jwt.sign(payload, ACCESS_TOKEN_SECRET);
};

module.exports = {
  createAccessToken,
};
