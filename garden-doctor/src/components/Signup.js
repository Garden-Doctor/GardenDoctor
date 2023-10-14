import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div>
      <h1>회원가입</h1>
      이름:{" "}
      <input
        type="text"
        placeholder="이름"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />{" "}
      <br />
      아이디:{" "}
      <input
        type="text"
        placeholder="아이디"
        onChange={(e) => {
          setId(e.target.value);
        }}
      />{" "}
      <br />
      비밀번호:{" "}
      <input
        type="text"
        placeholder="비밀번호"
        onChange={(e) => {
          setPw(e.target.value);
        }}
      />{" "}
      <br />
      비밀번호 확인:{" "}
      <input
        type="text"
        placeholder="비밀번호 확인"
        onChange={(e) => {
          setCheckPw(e.target.value);
        }}
      />{" "}
      <br />
      <button onClick={signupButton}>회원가입</button>
    </div>
  );
};

export default Signup;
