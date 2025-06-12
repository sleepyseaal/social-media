const router = require("express").Router();

const userController = require("../controllers/userController");

const requestValidator = require("../validators/request");
const { userValidator } = require("../validators/userValidator");

router.get(
  "/:userName/profile",
  userValidator,
  requestValidator,
  userController.getUser
);

router.get(
  "/:userName/profile/followers-only",
  userValidator,
  requestValidator,
  userController.getUser
);

router.post(
  "/:userName/follow",
  userValidator,
  requestValidator,
  userController.followUser
);

router.get(
  "/:userName/followers",
  userValidator,
  requestValidator,
  userController.getFollowers
);

module.exports = router;
