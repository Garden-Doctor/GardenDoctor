const express = require("express");
const router = express.Router();
const controller = require("../controller/Cboard");

router.post("/uploadBoard", controller.uploadBoard);

router.get("/getBoards", controller.getBoards);

router.get("/getBoard/:boardId", controller.getBoard);

router.post("/postComment", controller.postComment);

router.get("/getComments", controller.getComments);

router.get("/getComment/:boardId", controller.getComment);

router.post("/postLike", controller.postLike);

router.post("/postUnlike", controller.postUnlike);

router.get("/getLikes", controller.getLikes);

router.get("/getLike/:boardId", controller.getLike);

router.delete("/deleteBoard/:boardId", controller.deleteBoard);

router.patch("/updateBoard/:boardId", controller.updateBoard);

module.exports = router;
