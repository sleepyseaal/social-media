const express = require("express");
const app = express();

const errorHandler = require("./src/middlewares/errorHandler");
const AppError = require("./src/utils/AppError");

require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 To-Do List API is running");
});

app.use(errorHandler);

module.exports = app;
