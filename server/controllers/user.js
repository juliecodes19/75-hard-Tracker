const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../utils/token");
const { validateEmail } = require("../utils/validation");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).send({
      res: { data: "This email already exists!", statusCode: 400 },
      error: true,
    });
  }
  try {
    if (!name || !email || !password) {
      return res.status(400).send({
        res: { data: "Invalid Form Fields!", statusCode: 400 },
        error: true,
      });
    }

    //password validation
    if (password.length < 5) {
      return res.status(400).send({
        res: {
          data: "Password should be at least 5 characters!",
          statusCode: 400,
        },
        error: true,
      });
    }
    // email validation
    if (!validateEmail(email)) {
      return res.status(400).send({
        res: { data: "Invalid Email!", statusCode: 400 },
        error: true,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    res.status(200).json({ msg: "Congratulations!! Account created " });
  } catch (e) {
    return res.status(500).send({
      res: { data: "Internal Server Error!", statusCode: 500 },
      error: true,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        res: { data: "Invalid email or password", statusCode: 400 },
        error: true,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        res: { data: "This email is not registered!", statusCode: 400 },
        error: true,
      });
    }

    console.log("Stored Hashed Password:", user.password);
    console.log("Entered Password:", password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).send({
        res: { data: "Incorrect Password!", statusCode: 400 },
        error: true,
      });
    }

    const token = createAccessToken({ id: user._id });

    res
      .status(200)
      .json({ token, user, status: true, msg: "Login successful.." });
  } catch (e) {
    return res
      .status(401)
      .send({ error: "401", message: "Username or password is incorrect" });
  }
};

exports.profile = async (req, res) => {
  // REMOVE-START
  try {
    const { _id, firstName, lastName } = req.user;
    const user = { _id, firstName, lastName };
    res.status(200).send(user);
  } catch {
    res.status(404).send({ error, message: "Resource not found" });
  }
  // REMOVE-END
};

exports.logout = (req, res) => {
  // REMOVE-START
  req.session.destroy((error) => {
    if (error) {
      res
        .status(500)
        .send({ error, message: "Could not log out, please try again" });
    } else {
      res.clearCookie("sid");
      res.status(200).send({ message: "Logout successful" });
    }
  });
  // REMOVE-END
};
