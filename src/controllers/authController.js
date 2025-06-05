const prisma = require("../../prisma/config");

const bcrypt = require("bcrypt");

const AppError = require("../utils/AppError");

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

    res
      .status(201)
      .json({
        user: { name: user.name, email: user.email },
        message: "User created successfully",
      });
  } catch (err) {
    return next(err);
  }
}

module.exports = { signUp };
