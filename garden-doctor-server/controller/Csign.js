const { User } = require("../models");
const bcrypt = require("bcrypt");
const saltNumber = 10;
const SECRET = "secretKey";
const jwt = require("jsonwebtoken");

const bcryptPassword = (password) => {
  return bcrypt.hashSync(password, saltNumber);
};

const comparePassword = (password, dbPassword) => {
  return bcrypt.compareSync(password, dbPassword);
};

const get_todo = async (req, res) => {
  try {
    const todo = await Todos.findAll({
      attributes: ["id", "title", "done"],
    });
    res.send(todo);
  } catch (error) {
    console.log(error);
  }
};

const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { name, id, pw } = req.body;
    const newPw = bcryptPassword(pw);
    const signup = await User.create({
      name,
      userid: id,
      pw: newPw,
    });
    console.log(signup);
    res.send(signup);
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { id, pw } = req.body;
    User.findOne({
      where: { userid: id },
    }).then((result) => {
      console.log(result);
      if (result != null) {
        const compare = comparePassword(pw, result.dataValues.pw);
        const { id } = req.body;
        const token = jwt.sign({ id }, SECRET);
        res.send({ result: compare, token: token });
      } else {
        res.send({ result: false });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const verify = (req, res) => {
  jwt.verify(req.body.token, SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .send({ result: false, message: "검증에 실패하였습니다." });
    }
    res.send({ result: true, user: decoded });
  });
};

const patch_todo = (req, res) => {
  const { id, title, done } = req.body;
  Todos.update({ title, done }, { where: { id } }).then(() => {
    res.json({ result: true });
  });
};

const delete_todo = (req, res) => {
  const { id } = req.body;
  Todos.destroy({
    where: { id },
  }).then(() => {
    res.json({ result: true });
  });
};

module.exports = { get_todo, signup, login, verify, patch_todo, delete_todo };
