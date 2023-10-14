const express = require("express");
const router = express.Router();
const controller = require("../controller/Csign");

router.post("/signup", controller.signup);

router.post("/login", controller.login);

router.post("/verify", controller.verify);

module.exports = router;
