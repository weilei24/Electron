const logoutController = require("../controllers/logoutController.js");

var express = require("express");

const router = express.Router();

router.get("/logout", logoutController.userLogout);

module.exports = router;
