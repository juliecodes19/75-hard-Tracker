const jwt = require("jsonwebtoken");
const User = require("./../models/user");
const { ACCESS_TOKEN_SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ status: false, msg: "Authorization header not found" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer" || !parts[1]) {
    return res.status(401).json({
      status: false,
      msg: "Authorization header is malformed ",
    });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id).select("-password"); // Exclude password from the user object

    if (!user) {
      return res.status(401).json({ status: false, msg: "User not found" });
    }

    // Attach the user object to the request
    req.user = user;
    next(); // Proceed to the next middleware
  } catch (err) {
    console.error(err);
    // Differentiate between token errors and server errors
    return res.status(401).json({ status: false, msg: "Invalid token" });
  }
};

module.exports = authMiddleware;
