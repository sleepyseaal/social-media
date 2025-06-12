require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { ORIGIN } = require("./src/config/env");

const authRouter = require("./src/routes/authRouter");
const userRouter = require("./src/routes/userRouter");
const settingRouter = require("./src/routes/settingRouter");

const { logInHandler } = require("./src/middlewares/authHandler");
const errorHandler = require("./src/middlewares/errorHandler");
const notFoundHandler = require("./src/middlewares/notFoundHandler");

app.use(express.json());

app.use(
  cors({
    origin: JSON.parse(process.env.ORIGIN),
  })
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    data: { browser },
  });
});

app.use("/api/auth", authRouter);
app.use("/api/user", logInHandler, userRouter);

app.use("/api/setting", logInHandler, settingRouter);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
