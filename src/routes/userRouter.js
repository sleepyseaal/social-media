const router = require("express").Router();
const userController = require("../controllers/userController");
const requestValidator = require("../validators/request");
const { getUserValidator } = require("../validators/userValidator");

router.get(
  "/:userName",
  getUserValidator,
  requestValidator,
  userController.getUser
);

module.exports = router;
