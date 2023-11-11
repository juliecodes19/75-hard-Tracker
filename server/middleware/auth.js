const jwt = require("jsonwebtoken");
const User = require("./../models/user");
const { ACCESS_TOKEN_SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  console.log(token, ACCESS_TOKEN_SECRET, token.split(" ")[1]);
  if (!token)
    return res.status(400).json({ status: false, msg: "Token not found" });
  let user;
  try {
    user = jwt.verify(token.split(" ")[1], ACCESS_TOKEN_SECRET);
  } catch (err) {
    return res.status(401).json({ status: false, msg: "Invalid token" });
  }

  try {
    user = await User.findById(user.id);
    if (!user) {
      return res.status(401).json({ status: false, msg: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

module.exports = authMiddleware;
