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

const delete_todo = (req, res) => {
  const { id } = req.body;
  Todos.destroy({
    where: { id },
  }).then(() => {
    res.json({ result: true });
  });
};

module.exports = {
  getBoards,
  uploadBoard,
  postComment,
  getComments,
  postLike,
  postUnlike,
  getLikes,
  patch_todo,
  delete_todo,
};
