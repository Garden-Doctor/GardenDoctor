import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../../styles/login.scss";

const Login = () => {
  const navigate = useNavigate();

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
      <p className="idBox">
        <img src="imgs/id.svg" />
        <input
          type="text"
          placeholder="아이디"
          onChange={(e) => setId(e.target.value)}
        />
      </p>
      <p className="pwBox">
        <img src="imgs/pw.svg" />
        <input
          type="text"
          placeholder="비밀번호"
          onChange={(e) => setPw(e.target.value)}
        />
      </p>
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
