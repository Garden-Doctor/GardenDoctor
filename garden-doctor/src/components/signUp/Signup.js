import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../../styles/signup.scss";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [checkPw, setCheckPw] = useState("");

  const signupButton = () => {
    console.log(name, id, pw, checkPw);
    const signup = async () => {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/sign/signup",
        data: {
          name: name,
          id: id,
          pw: pw,
        },
      });
      console.log(res.data);
    };

    if (pw === checkPw) {
      signup().then(navigate("/login"));
    } else {
      alert("비밀번호가 서로 다릅니다.");
    }
  };

  return (
    <div className="signup_container">
      <h1>회원가입</h1>
      <div className="signup_top">
        <div className="Box">
          <img src="imgs/id.svg" className="idImg" />
          <input
            type="text"
            placeholder="아이디"
            onChange={(e) => {
              setId(e.target.value);
            }}
            className="signup_id_input"
          />
          <button className="check_button">중복 확인</button>
        </div>
        <div className="Box">
          <img src="imgs/password.svg" className="idImg" />
          <input
            type="password"
            placeholder="비밀번호"
            className="signup_pw_input"
            onChange={(e) => {
              setPw(e.target.value);
            }}
          />
        </div>
        <div className="Box">
          <img src="imgs/password.svg" className="idImg" />
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="signup_pwcheck_input"
            onChange={(e) => {
              setCheckPw(e.target.value);
            }}
          />
          <button className="check_button">일치 확인</button>
        </div>
      </div>
      <div className="signup_bottom">
        <div className="Box">
          <img src="imgs/id.svg" className="idImg" />
          <input
            type="text"
            placeholder="이름"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="Box">
          <img src="imgs/id.svg" className="idImg" />
          <input
            type="text"
            placeholder="닉네임"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button className="check_button">중복 확인</button>
        </div>
        <div className="Box">
          <img src="imgs/birth.svg" className="idImg" />
          <input
            type="date"
            placeholder="생년월일"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="Box">
          <img src="imgs/phone.svg" className="idImg" />
          <input
            type="text"
            placeholder="전화번호"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
      </div>

      <button className="register_button" onClick={signupButton}>
        회원가입
      </button>
    </div>
  );
};

export default Signup;
