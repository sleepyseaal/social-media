const AppError = require("../utils/appError");
const prisma = require("../../prisma/config");

async function getUser(req, res, next) {
  try {
    const { userName } = req.params;

    const user = await prisma.User.findUnique({
      where: { username: userName },
    });

    if (!user) {
      return next(new AppError("User not found", 404, "USER_NOT_FOUND"));
    }

    const { id, email, name } = user;
    res.status(200).json({
      success: true,
      message: "User found",
      data: { id, email, name },
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { getUser };
