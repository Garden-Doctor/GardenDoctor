import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../store/isLogin";

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

  return (
    <div className="login-container">
      <img src="imgs/login_logo.png" alt="logo" />
      <div className="idBox">
        <img src="imgs/id.svg" className="idImg" />
        <input
          type="text"
          id="id_input"
          placeholder="아이디"
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className="pwBox">
        <img src="imgs/pw.svg" className="pwImg" />
        <input
          type="text"
          placeholder="비밀번호"
          onChange={(e) => setPw(e.target.value)}
        />
      </div>
      <span className="login-button-container">
        <button onClick={loginButton} className="loginbutton">
          로그인
        </button>
        <button className="loginbutton kakao">카카오톡으로 로그인</button>
      </span>
    </div>
  );
};

export default Login;
