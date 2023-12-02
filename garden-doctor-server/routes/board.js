const express = require("express");
const router = express.Router();
const controller = require("../controller/Cboard");

router.post("/uploadBoard", controller.uploadBoard);

router.get("/getBoards", controller.getBoards);

router.get("/getBoard/:boardId", controller.getBoard);

router.post("/postComment", controller.postComment);

router.get("/getComments", controller.getComments);

router.get("/getComment/:boardId", controller.getComment);

router.post("/postLike/:boardId", controller.postLike);

router.get("/getLikes", controller.getLikes);

router.get("/getLike/:boardId", controller.getLike);

router.delete("/deleteLike/:boardId", controller.deleteLike);

router.delete("/deleteBoard/:boardId", controller.deleteBoard);

router.patch("/updateBoard/:boardId", controller.updateBoard);

router.post("/myBoards", controller.myBoard);

router.post("/myBoards/comment", controller.myBoardComment);

router.post("/myBoards/like", controller.myBoardLike);

router.post("/myBoards/findMyLike", controller.findMyLike);

router.post("/myBoards/findMyPlant", controller.findMyPlant);

router.post("/myBoards/findMyLikeBoards", controller.findMyLikeBoards);

router.get("/getMostLikedBoards", controller.getMostLikedBoards);

router.post("/getPlantBoard", controller.getPlantBoard);

module.exports = router;
