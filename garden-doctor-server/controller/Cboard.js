const { User, Board, Comment, Like } = require("../models");

const getBoards = async (req, res) => {
  try {
    const getBoards = await Board.findAll({
      attributes: ["boardId", "userId", "text", "img", "createdAt"],
    });
    res.send(getBoards);
  } catch (error) {
    console.log(error);
  }
};

const getBoard = async (req, res) => {
  try {
    const getBoard = await Board.findOne({
      where: { boardId: req.params.boardId }, // 수정된 부분
    });
    res.json(getBoard);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const uploadBoard = async (req, res) => {
  try {
    console.log(req.body);
    const { userId, text, img } = req.body;
    const upload = await Board.create({
      userId,
      text,
      img,
    });
    console.log(upload);
    res.send(upload);
  } catch (error) {
    console.log(error);
  }
};

const postComment = async (req, res) => {
  try {
    console.log(req.body);
    const { userId, commentText, boardId } = req.body;
    const upload = await Comment.create({
      userId,
      commentText,
      boardId,
    });
    console.log(upload);
    res.send(upload);
  } catch (error) {
    console.log(error);
  }
};

const getComments = async (req, res) => {
  try {
    const getComments = await Comment.findAll({
      attributes: ["boardId", "userId", "commentText", "commentId"],
    });
    res.send(getComments);
  } catch (error) {
    console.log(error);
  }
};

const getComment = async (req, res) => {
  try {
    const getComment = await Comment.findAll({
      where: { boardId: req.params.boardId },
    });
    res.send(getComment);
  } catch (error) {
    console.log(error);
  }
};

const patch_todo = (req, res) => {
  const { id, title, done } = req.body;
  Todos.update({ title, done }, { where: { id } }).then(() => {
    res.json({ result: true });
  });
};

const postLike = async (req, res) => {
  try {
    console.log(req.body);
    const { userId, boardId } = req.body;
    const upload = await Like.create({
      userId,
      boardId,
    });
    console.log(upload);
    res.send(upload);
  } catch (error) {
    console.log(error);
  }
};

const postUnlike = (req, res) => {
  const { likeId } = req.body;
  Like.destroy({
    where: { likeId },
  }).then(() => {
    res.json({ result: true });
  });
};

const getLikes = async (req, res) => {
  try {
    const getLikes = await Like.findAll({
      attributes: ["LikeId", "userId", "boardId"],
    });
    res.send(getLikes);
  } catch (error) {
    console.log(error);
  }
};

const getLike = async (req, res) => {
  try {
    const getLike = await Like.findAll({
      where: { boardId: req.params.boardId },
    });
    res.send(getLike);
  } catch (error) {
    console.log(error);
  }
};

const deleteBoard = async (req, res) => {
  const { boardId } = req.params;

  try {
    // 1. 게시글(Board) 삭제
    await Board.destroy({
      where: { boardId },
    });

    // 2. 관련된 좋아요(Like) 데이터 삭제
    await Like.destroy({
      where: { boardId },
    });

    // 삭제 성공 응답
    res.status(200).send({ message: "게시글이 성공적으로 삭제되었습니다." });
  } catch (error) {
    console.error("Error deleting board:", error);
    res.status(500).send({ message: "게시글 삭제 중 오류가 발생했습니다." });
  }
};

const updateBoard = async (req, res) => {
  const { boardId } = req.params;
  const { text, img } = req.body;

  try {
    // 1. 게시글(Board) 업데이트
    await Board.update(
      { text, img },
      {
        where: { boardId },
      }
    );

    // 업데이트 성공 응답
    res
      .status(200)
      .send({ message: "게시글이 성공적으로 업데이트되었습니다." });
  } catch (error) {
    console.error("Error updating board:", error);
    res
      .status(500)
      .send({ message: "게시글 업데이트 중 오류가 발생했습니다." });
  }
};

module.exports = {
  getBoards,
  uploadBoard,
  postComment,
  getComments,
  getComment,
  postLike,
  postUnlike,
  getLikes,
  getLike,
  patch_todo,
  deleteBoard,
  getBoard,
  updateBoard,
};
