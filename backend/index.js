import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import authRouter from "./src/routers/authRouter.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "MyNovelList backend working" });
});

app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    redirect: err.redirect || null,
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server Started at", port);
  connectDB();
});
