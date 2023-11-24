const { User } = require("../models");
const bcrypt = require("bcrypt");
const saltNumber = 10;
const SECRET = "secretKey";
const jwt = require("jsonwebtoken");
const axios = require("axios");
const dotenv = require("dotenv");
const querystring = require("querystring");
const { response } = require("express");

const bcryptPassword = (password) => {
  return bcrypt.hashSync(password, saltNumber);
};

const comparePassword = (password, dbPassword) => {
  return bcrypt.compareSync(password, dbPassword);
};

//local 회원가입
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
      loginType: "local",
    });
    console.log(signup);
    res.send(signup);
  } catch (error) {
    console.log(error);
  }
};

//카카오 회원가입.
const kakaoUserData = async (req, res) => {
  try {
    const { userId, name, nickname, userImg } = req.body;
    console.log("req.body", req.body);
    console.log("Ddddd", userId, name, nickname, userImg);

    //중복체크 findOrCreate ( where에 해당 값이 없으면 create)
    const kakaoSignUp = await User.findOrCreate({
      where: { userId: userId },
      defaults: {
        name,
        userId,
        nickName: nickname,
        userImg,
        loginType: "local",
      },
    });

    res.send(kakaoSignUp);
  } catch (error) {
    console.log(error);
  }
};
//카카오로그인을 위한 토큰 생성
const makeToken = async (req, res) => {
  const { userId } = req.body;

  const token = jwt.sign({ userId }, SECRET);
  res.send({ token: token, id: userId });
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
      return res.json({ result: false });
    }
    res.send({ result: true });
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
      return res.json({ result: false });
    }
    res.send({ result: true });
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

// 카카오 인증 및 액세스 토큰 요청
const kakaoLogin = async (req, res) => {
  const { code } = req.body;

  // 카카오로부터 받은 인가코드로 액세스 토큰 및 리프레시 토큰 요청
  const authorizationData = await getAuthorizationCode(code);

  // 액세스 토큰 요청이 성공하면 리프레시 토큰 요청
  if (authorizationData && authorizationData.refresh_token) {
    const refreshTokenData = await requestRefreshToken(
      authorizationData.refresh_token
    );
    res.status(200).json(refreshTokenData);
  } else {
    res.status(400).json({ error: "Failed to obtain refresh token" });
  }
};

//카카오에서 인가코드를 받아오는 함수
const getAuthorizationCode = async (code) => {
  const REST_API_KEY = process.env.REST_API_KEY;
  const REDIRECT_URI = process.env.REDIRECT_URI;

  const data = querystring.stringify({
    grant_type: "authorization_code",
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code: code,
  });
  try {
    const response = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      data,
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Authorization code request error:", error);
    return null;
  }
};

// Refresh token 요청 함수
const requestRefreshToken = async (refreshToken) => {
  const REST_API_KEY = process.env.REST_API_KEY;
  const data = querystring.stringify({
    grant_type: "refresh_token",
    client_id: REST_API_KEY,
    refresh_token: refreshToken,
  });

  try {
    const response = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      data,
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Refresh token request error:", error);
    return null;
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
  kakaoLogin,
  kakaoUserData,
  makeToken,
};
