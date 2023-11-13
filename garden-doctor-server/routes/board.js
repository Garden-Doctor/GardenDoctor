const express = require("express");
const router = express.Router();
const controller = require("../controller/Cboard");

router.post("/uploadBoard", controller.uploadBoard);

router.get("/getBoards", controller.getBoards);

router.post("/postComment", controller.postComment);

router.get("/getComments", controller.getComments);

router.post("/postLike", controller.postLike);

router.post("/postUnlike", controller.postUnlike);

router.get("/getLikes", controller.getLikes);

module.exports = router;
