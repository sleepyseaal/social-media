const router = require("express").Router();
const settingController = require("../controllers/settingController");

router.get("/login-history", settingController.getLogInHistory);

module.exports = router;
