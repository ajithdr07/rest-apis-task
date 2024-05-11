import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import "dotenv/config";
import { fileURLToPath } from "url";
import path from "path";

import appRoutes from "../routes/routes.js";
const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "..", "intro.txt");

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use(express.json());
app.use(cookieParser());
app.use("/api", appRoutes);

app.use((req, res, next) => {
  const error = new Error("Resource Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("DB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server is running on PORT: ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log("Something went wrong - ", err));
