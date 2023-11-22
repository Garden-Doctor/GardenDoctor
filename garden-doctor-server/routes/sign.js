const express = require("express");
const router = express.Router();
const controller = require("../controller/Csign");

router.post("/signup", controller.signup);

router.post("/signup/checkid", controller.checkId);

router.post("/signup/checknickname", controller.checkNickname);

router.post("/login", controller.login);

router.post("/verify", controller.verify);

router.post("/myInfo", controller.myInfo);

module.exports = router;
