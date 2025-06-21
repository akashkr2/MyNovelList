import cloudinary from "../config/cloudinary.js";
import generateToken from "../config/jwtToken.js";
import User from "../models/userModel.js";

export const userSignup = async (req, res, next) => {
  try {
    const { name, email, password, username } = req.body;
    //   console.log(name, email, password, username);

    const avatar = req.file;

    //   console.log("Avatar: ", avatar);

    if (!name || !email || !username || !password) {
      const err = new Error("All fields required");
      err.statusCode = 404;
      return next(err);
    }

    let result;

    if (avatar) {
      const b64 = Buffer.from(avatar.buffer).toString("base64");
      const dataURI = `data:${avatar.mimetype};base64,${b64}`;

      if (!dataURI) {
        const error = new Error("Failed to convert photo to data URI");
        error.statusCode = 500;
        return next(error);
      }
      console.log("Data URI", dataURI.slice(0, 50) + "...");

      result = await cloudinary.uploader.upload(dataURI, {
        folder: "mynovellist",
        width: 300,
        height: 300,
        crop: "fill",
      });

      if (!result) {
        const error = new Error("Failed to upload photo");
        error.statusCode = 500;
        return next(error);
      }

      console.log("Photo uploaded successfully:", result);
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
      username,
      password,
      avatar:
        result?.secure_url ||
        `https://placehold.co/600x400?text=${name.charAt(0).toUpperCase()}`,
      avatarPublicId: result.public_id,
    });

    if (user) {
      res.status(200).json({ message: "User registered successfully" });
    }
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  //
  try {
    const { username, password } = req.body;

    //   console.log(username, password);

    if (!username || !password) {
      const err = new Error("All fields required");
      err.statusCode = 404;
      return next(err);
    }

    const user = await User.findOne({ username });
    if (!user) {
      const err = new Error("Incorrect username or password");
      err.statusCode = 409;
      return next(err);
    }

    //   console.log(user);

    const verifyPass = await user.comparePassword(password);
    //   console.log(verifyPass);
    if (!verifyPass) {
      const err = new Error("Incorrect username or password");
      err.statusCode = 409;
      return next(err);
    }

    //   console.log(user);

    generateToken(user._id, res);

    const userExp = {
      username: user.username,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };

    res
      .status(200)
      .json({ message: `Welcome back ${user.name}`, user: userExp });
  } catch (error) {
    next(error);
  }
};

export const userLogout = async (req, res, next) => {
  try {
    // Clear the token from the request (if using cookies, clear the cookie)
    // res.cookie("jwt", "", {
    //   httpOnly: true,
    //   expires: new Date(0), // Set expiration to the past
    // });
    res.clearCookie("jwt", {
      httpOnly: true,
      //   secure: true,
      sameSite: "strict", // must match original settings
    });

    // Send response
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};
