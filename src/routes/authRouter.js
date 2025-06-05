const router = require("express").Router();

const signUpValidator = require("../validators/signUpValidator");
const requestValidator = require("../validators/request");

const authController = require("../controllers/authController");

router.post(
  "/signup",
  signUpValidator,
  requestValidator,
  authController.signUp
);

module.exports = router;
