import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../store/isLogin";

import logo_src from "../../images/login_logo.png";
import id_src from "../../images/id.svg";
import pw_src from "../../images/pw.svg";

import "../../styles/login.scss";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const loginButton = () => {
    console.log(id);
    console.log(pw);

    const login = async () => {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/sign/login",
        data: {
          id: id,
          pw: pw,
        },
      });
      return res.data;
    };
    login().then((data) => {
      if (data.result) {
        console.log(data);
        alert("로그인 성공");
        sessionStorage.setItem("token", data.token);
        dispatch({ type: LOGIN, user: data.id });
        navigate("/");
      } else {
        console.log(data);
        alert("로그인 실패");
      }
    });
  };

  const signupButton = () => {
    navigate("/signup");
  };

  const findIdPwButton = () => {
    navigate("/findIdPw");
  };

  const Rest_api_key = process.env.REACT_APP_KAKAO_INIT_KEY;
  const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const kakaoURI = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const kakaoLogin = () => {
    window.location.href = kakaoURI;
  };

  return (
    <div className="login-container">
      <img src={logo_src} alt="logo" />
      <div className="idBox">
        <img src={id_src} className="idImg" />
        <input
          type="text"
          id="id_input"
          placeholder="아이디"
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className="pwBox">
        <img src={pw_src} className="pwImg" />
        <input
          type="password"
          placeholder="비밀번호"
          onChange={(e) => setPw(e.target.value)}
        />
      </div>
      <span className="login-button-container">
        <button onClick={loginButton} className="loginbutton">
          로그인
        </button>
        <button className="loginbutton kakao" onClick={kakaoLogin}>
          카카오톡으로 로그인
        </button>
      </span>
      <div className="login_bottom">
        <span onClick={signupButton}>회원가입</span>
        <span onClick={findIdPwButton}>아이디 / 비밀번호 찾기</span>
      </div>
    </div>
  );
};

export default Login;
