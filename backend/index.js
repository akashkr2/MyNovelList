import express, { json } from "express";
import connectDB from "./src/config/db.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend working" });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server Started at", port);
  connectDB();
});
