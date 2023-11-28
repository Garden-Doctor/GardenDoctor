import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../../styles/signup.scss";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [checkPw, setCheckPw] = useState("");

  const [nickName, setNickName] = useState("");
  const [birth, setBirth] = useState("");
  const [telNum, setTelNum] = useState("");

  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const [isNickNameAvailable, setIsNickNameAvailable] = useState(false);
  const [passwordPlag, setPasswordPlag] = useState(false);

  const [checkMessage, setCheckMessage] = useState("");

  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  // 회원가입 버튼
  const signupButton = async (e) => {
    e.preventDefault();

    // 빈칸일 때 처리
    if (!id || !pw || !name || !nickName || !birth || !telNum) {
      setCheckMessage("모든 필드를 입력해주세요.");
      return;
    }

    if (imgFile === "") {
      setCheckMessage("프로필 이미지를 넣어주세요");
      return;
    }

    // ID NickName 체크
    if (!isIdAvailable) {
      setCheckMessage("아이디 : 중복 확인을 눌러주세요");
      return;
    }

    if (!passwordPlag) {
      setCheckMessage("비밀번호 : 일치 확인을 눌러주세요");
      return;
    }

    if (!isNickNameAvailable) {
      setCheckMessage("닉네임 : 중복 확인을 눌러주세요");
      return;
    }

    const formData = new FormData();

    // img 현재 파일 추가
    if (imgRef.current && imgRef.current.files.length > 0) {
      const file = imgRef.current.files[0];
      formData.append("file", file);
    }

    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/upload/single",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((result) => {
        console.log(result.data);
        const res2 = axios({
          method: "POST",
          url: "http://localhost:8000/sign/signup",
          data: {
            id,
            pw,
            name,
            nickName,
            birth,
            telNum,
            img: result.data,
          },
        });
        console.log(res2);
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // 아이디 중복 확인 버튼
  const checkIdButton = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/sign/signup/checkid",
        data: { id },
      });

      // 응답을 확인하고 메시지에 따라 처리
      // 사용 가능할때
      if (res.data.result === true) {
        setCheckMessage("아이디 : 사용 가능한 아이디입니다.");
        setIsIdAvailable(true);
      } else {
        setCheckMessage("아이디 : 이미 사용중인 아이디입니다.");
        setIsIdAvailable(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 비밀번호 일치 버튼
  const pwCheckButton = () => {
    if (pw === checkPw) {
      setCheckMessage("비밀번호가 일치합니다.");
      setPasswordPlag(true);
    } else {
      setCheckMessage("비밀번호가 서로 다릅니다.");
      setPasswordPlag(false);
    }
  };

  // 닉네임 중복 확인 버튼
  const checkNickButton = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/sign/signup/checknickname",
        data: { nickName },
      });

      // 응답을 확인하고 메시지에 따라 처리
      if (res.data.result === true) {
        setCheckMessage("닉네임 : 사용 가능한 닉네임입니다.");
        setIsNickNameAvailable(true);
      } else {
        setCheckMessage("닉네임 : 이미 사용중인 닉네임입니다.");
        setIsNickNameAvailable(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //오늘 날짜 구하기
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];

  return (
    <div className="signup_container">
      <h1>회원가입</h1>
      <form className="signup_form" encType="multipart/form-data">
        <div className="signup_img">
          <div className="profile_box">
            <img
              src={imgFile ? imgFile : `/imgs/user.svg`}
              alt="프로필 이미지"
            />
          </div>
          <label className="signup-profileImg-label" htmlFor="profileImg">
            프로필 이미지 추가
          </label>
          <input
            className="signup-profileImg-input"
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={saveImgFile}
            ref={imgRef}
          />
        </div>
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
            <button
              type="button"
              className="check_button"
              onClick={checkIdButton}
            >
              중복 확인
            </button>
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
            <button
              className="check_button"
              type="button"
              onClick={pwCheckButton}
            >
              일치 확인
            </button>
          </div>
        </div>

        {/* ----- 중복 확인 멘트 ------ */}
        <div className="signup_check_box">{checkMessage}</div>

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
                setNickName(e.target.value);
              }}
            />
            <button
              type="button"
              className="check_button"
              onClick={checkNickButton}
            >
              중복 확인
            </button>
          </div>
          <div className="Box">
            <img src="imgs/birth.svg" className="idImg" />
            <input
              type="date"
              placeholder="생년월일"
              onChange={(e) => {
                setBirth(e.target.value);
              }}
              max={formattedToday}
            />
          </div>
          <div className="Box">
            <img src="imgs/phone.svg" className="idImg" />
            <input
              type="text"
              placeholder="전화번호"
              onChange={(e) => {
                setTelNum(e.target.value);
              }}
            />
          </div>
        </div>

        <button className="register_button" onClick={signupButton}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Signup;
