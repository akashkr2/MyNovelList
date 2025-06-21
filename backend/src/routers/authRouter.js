import express from "express";
import { userLogin, userLogout, userSignup } from "../controllers/authController.js";
import multer from "multer";

const upload = multer();

const router = express.Router();

router.post("/signup", upload.single("avatar"), userSignup);

router.post("/login", userLogin);

router.post("/logout", userLogout);

export default router;
