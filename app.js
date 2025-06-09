const express = require("express");
const app = express();

const authRouter = require("./src/routes/authRouter");
const userRouter = require("./src/routes/userRouter");

const signInHandler = require("./src/middlewares/authHundler");
const errorHandler = require("./src/middlewares/errorHandler");
const { sign } = require("jsonwebtoken");

require("dotenv").config();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", signInHandler, userRouter);

app.get("/", (req, res) => {
  res.send("🚀 To-Do List API is running");
});

app.use(errorHandler);

module.exports = app;
