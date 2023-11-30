const express = require("express");
const router = express.Router();
const controller = require("../controller/Csign");

router.post("/signup", controller.signup);

router.post("/signup/checkid", controller.checkId);

router.post("/signup/checknickname", controller.checkNickname);

router.post("/login", controller.login);

router.post("/verify", controller.verify);

router.post("/myInfo", controller.myInfo);

router.post("/kakaoLogin", controller.kakaoLogin);

//카카오 정보로 회원 가입 시키기.
router.post("/kakaoUserData", controller.kakaoUserData);

router.post("/makeToken", controller.makeToken);

router.post("/findLoginType", controller.findLoginType);

router.post("/edit", controller.edit);

router.post("/findId", controller.findId);

router.post("/sendEmail", controller.sendEmail);

router.post("/findPw", controller.findPw);

module.exports = router;
