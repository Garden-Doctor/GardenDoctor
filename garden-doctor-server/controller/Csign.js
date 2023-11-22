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

const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { name, id, pw, nickName, birth, telNum, img } = req.body;

    const newPw = bcryptPassword(pw);

    const signup = await User.create({
      name,
      userId: id,
      pw: newPw,
      nickName,
      birth,
      telNum,
      userImg: img,
    });
    console.log(signup);
    res.send(signup);
  } catch (error) {
    console.log(error);
  }
};

const checkId = async (req, res) => {
  try {
    const { id } = req.body;

    const existingUser = await User.findOne({
      where: {
        userId: id,
      },
    });

    if (existingUser) {
      return res.json({ message: "중복되는 아이디가 있습니다." });
    }
    res.send({ message: "사용가능한 아이디입니다." });
  } catch (error) {
    console.log("id중복체크 eroor : ", error);
  }
};

const checkNickname = async (req, res) => {
  try {
    const { nickName } = req.body;

    const existingUser = await User.findOne({
      where: {
        nickName,
      },
    });

    if (existingUser) {
      return res.json({ message: "중복되는 닉네임이 있습니다." });
    }
    res.send({ message: "사용가능한 닉네임입니다." });
  } catch (error) {
    console.log("id중복체크 eroor : ", error);
  }
};

const login = async (req, res) => {
  try {
    const { id, pw } = req.body;
    User.findOne({
      where: { userId: id },
    }).then((result) => {
      console.log(result);
      if (result != null) {
        const compare = comparePassword(pw, result.dataValues.pw);
        const { id } = req.body;
        const token = jwt.sign({ id }, SECRET);
        res.send({ result: compare, token: token, id: id });
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

const myInfo = async (req, res) => {
  const { userId } = req.body;
  console.log("userId", userId);
  try {
    const myInfos = await User.findOne({
      where: { userId: userId },
      attributes: ["name", "nickName", "birth", "telNum", "userImg"],
    });
    res.status(200).send(myInfos);
  } catch (error) {
    res.status(500).send({ message: "에러발생", error });
  }
};

module.exports = {
  signup,
  checkId,
  checkNickname,
  login,
  verify,
  patch_todo,
  delete_todo,
  myInfo,
};
