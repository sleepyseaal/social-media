const router = require("express").Router();

const { signUpValidator } = require("../validators/authValidator");
const { logInValidator } = require("../validators/authValidator");
const requestValidator = require("../validators/request");

const authController = require("../controllers/authController");

router.post(
  "/signup",
  signUpValidator,
  requestValidator,
  authController.signUp
);

router.post("/login", logInValidator, requestValidator, authController.logIn);

module.exports = router;
