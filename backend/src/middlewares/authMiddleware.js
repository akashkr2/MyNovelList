import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protectUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.key);
  //   .select("-_id -password");

  if (!user) {
    const err = new Error("Invalid Token");
    err.statusCode = 401;
    return next(err);
  }

  req.user = user;
  //   req.userId = user._id;

  next();
};
