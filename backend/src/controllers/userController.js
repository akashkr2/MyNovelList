import cloudinary from "../config/cloudinary.js";
import Novel from "../models/NovelModel.js";
import multer from "multer";
import User from "../models/userModel.js";

export const updateUser = async (req, res, next) => {
  try {
    //   console.log("ok");
    const id = req.user._id;
    //   console.log(id);
    const currAvatar = req.user.avatar;
    //   console.log(currAvatar);

    const currAvatarPublicId = req.user.avatarPublicId;
    //   console.log(currAvatarPublicId);

    const { name, email } = req.body;

    const avatar = req.file;
    //   console.log(avatar)

    if (!name || !email) {
      const err = new Error("All fields required");
      err.statusCode = 404;
      next(err);
    }

    let result;
    if (avatar) {
      //
      await cloudinary.uploader.destroy(currAvatarPublicId);

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

    const data = {
      name,
      email,
      avatar: result?.secure_url || currAvatar,
    };

    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

    //   console.log(data);

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    next(error);
  }
};

export const addNovel = (req, res, next) => {
  const id = req.user._id;

  const {
    bookId,
    title,
    author,
    category,
    description,
    cover,
    tags,
    novelStatus,
    readingStatus,
    isFavorite = false,
    isBookmarked = false,
  } = req.body;

  if (
    !title ||
    !author ||
    !category ||
    !description ||
    !cover ||
    !tags ||
    !novelStatus ||
    !readingStatus
  ) {
    const err = new Error("All fields required");
    err.statusCode = 404;
    next(err);
  }

  const data = {
    userId: id,
    title,
    author,
    category,
    description,
    cover,
    tags,
    novelStatus,
    readingStatus,
    isFavorite,
    isBookmarked,
  };

  if (bookId) data.bookId = bookId;

  console.log(data);

  res.status(200).json({ message: "Novel added successfully" });
};

export const getNovels = (req, res, next) => {
  const id = req.user._id;
  const novels = Novel.find({ id });
  console.log(novels);
  res.status(200).json({ message: "Novels fetch successfully", novels });
};
