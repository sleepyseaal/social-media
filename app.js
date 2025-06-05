const express = require("express");
const app = express();

const authRouter = require("./src/routes/authRouter");

const errorHandler = require("./src/middlewares/errorHandler");

require("dotenv").config();

app.use(express.json());

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("🚀 To-Do List API is running");
});

app.use(errorHandler);

module.exports = app;
