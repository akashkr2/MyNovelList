import generateToken from "../config/jwtToken.js";
import User from "../models/userModel.js";

export const userSignup = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    const err = new Error("All fields required");
    err.statusCode = 404;
    return next(err);
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    // console.log(existingUser);
    const err = new Error("A user already exists with this email");
    err.statusCode = 409;
    return next(err);
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(200).json({ message: "User registered successfully" });
  }
};

export const userLogin = async (req, res, next) => {
  //
  const { email, password } = req.body;

  if (!email || !password) {
    const err = new Error("All fields required");
    err.statusCode = 404;
    return next(err);
  }

  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error("Incorrect email or password");
    err.statusCode = 409;
    return next(err);
  }

  //   console.log(user);

  const verifyPass = await user.comparePassword(password);
  //   console.log(verifyPass);
  if (!verifyPass) {
    const err = new Error("Incorrect email or password");
    err.statusCode = 409;
    return next(err);
  }

  //   console.log(user);

  generateToken(user._id, res);

  res.status(200).json({ message: "User registered successfully" });
};
