const loginAndRegisterController = require("../controllers/loginAndRegisterController");

var express = require("express");

const router = express.Router();

router.post("/login", loginAndRegisterController.login);
router.post("/register", loginAndRegisterController.register);

module.exports = router;
