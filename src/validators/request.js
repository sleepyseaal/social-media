const { validationResult } = require("express-validator");
const AppError = require("../utils/AppError");

function requestValidator(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => {
      return { field: err.path, message: err.msg };
    });

    return next(
      new AppError("Validation failed", 400, "INVALID_REQUEST", formattedErrors)
    );
  }

  next();
}

module.exports = requestValidator;
