const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const UAparser = require("ua-parser-js");

async function signUp(req, res, next) {
  try {
    const { name, email, password, userName } = req.body;

    const emailExists = await prisma.User.findUnique({ where: { email } });

    if (emailExists) {
      return next(new AppError("Email already exists", 409, "EMAIL_EXISTS"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.User.create({
      data: {
        name,
        email,
        password: hashedPassword,
        username: userName,
      },
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { id: user.id, name, email, userName },
    });
  } catch (err) {
    return next(err);
  }
}

async function logIn(req, res, next) {
  try {
    const { id, name, email, password, userName } = req.body;

    const user = await prisma.User.findUnique({
      where: { email },
    });

    if (!user) {
      return next(
        new AppError("Incorrect email or password", 401, "INVALID_CREDENTIALS")
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return next(
        new AppError("Incorrect email or password", 401, "INVALID_CREDENTIALS")
      );
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const parser = new UAparser(req.headers["user-agent"]);
    const UAResult = parser.getResult();

    const ip = req.ip;
    const browser = UAResult.browser.name || "unknown";
    const os = UAResult.os.name || "unknown";
    const deviceType = UAResult.device.type || "desktop";
    const deviceModel = UAResult.device.model
      ? ` (${UAResult.device.model})`
      : "";

    const device = deviceType + deviceModel;

    await prisma.loginHistory.create({
      data: {
        userId: user.id,
        browser,
        os,
        device,
        ip,
      },
    });

    res.json({
      message: "User logged in successfully",
      token: token,
      data: { id, name, email, userName },
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { signUp, logIn };
