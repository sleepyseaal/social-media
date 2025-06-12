const { param } = require("express-validator");

const userValidator = [
  param("userName")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 2, max: 30 })
    .withMessage("Username must be between 2 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),
];

module.exports = { userValidator };
