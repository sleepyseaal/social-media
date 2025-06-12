const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

function logInHandler(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new AppError("UNAUTHORIZED", 401, "Please login to access this route")
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    if (
      err.name === "TokenExpiredError" ||
      err.name === "JsonWebTokenError" ||
      err.name === "NotBeforeError"
    ) {
      return next(
        new AppError("UNAUTHORIZED", 401, "Please login to access this route")
      );
    }

    return next(err);
  }
}

module.exports = { logInHandler };
