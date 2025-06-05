const { body } = require("express-validator");

const signUpValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[a-z]/)
    .withMessage("Password must include a lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must include an uppercase letter")
    .matches(/\d/)
    .withMessage("Password must include a number")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must include a special character"),
];

module.exports = signUpValidator;
