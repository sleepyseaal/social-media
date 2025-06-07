const prisma = require("../../prisma/config");
const bcrypt = require("bcrypt");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");

async function signUp(req, res, next) {
  try {
    const { name, email, password } = req.body;

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
      },
    });

    res.status(201).json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
      message: "User created successfully",
    });
  } catch (err) {
    return next(err);
  }
}

async function logIn(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await prisma.User.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
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

    res.json({
      message: "User logged in successfully",
      token,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { signUp, logIn };
