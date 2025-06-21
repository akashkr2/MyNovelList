import express from "express";
import { protectUser } from "../middlewares/authMiddleware.js";
import { getNovels, updateUser } from "../controllers/userController.js";
import { uploadLocal } from "../middlewares/userMiddleware.js";
import multer from "multer";

const upload = multer();

const router = express.Router();

router.put("/update", protectUser, upload.single("avatar"), updateUser);

router.get("/getNovels", protectUser, getNovels);

router.get("/addNovels", protectUser, uploadLocal.single("cover"), getNovels);

export default router;
