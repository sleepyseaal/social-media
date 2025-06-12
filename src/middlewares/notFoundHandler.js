const AppError = require("../utils/AppError");

module.exports = (req, res, next) => {
  const error = new AppError("Bad method or path", 404, "NOT_FOUND");
  next(error);
};
