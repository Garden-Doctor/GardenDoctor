import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import id_src from "../../images/id.svg";
import pw_src from "../../images/pw.svg";
import user_src from "../../images/user.png";
import birth_src from "../../images/birth.svg";
import phone_src from "../../images/phone.svg";

import "../../styles/signup.scss";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [id, setId] = useState(null);
  const [pw, setPw] = useState(null);
  const [checkPw, setCheckPw] = useState(null);

  const [nickName, setNickName] = useState(null);
  const [birth, setBirth] = useState(null);
  const [telNum, setTelNum] = useState("");

  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const [isNickNameAvailable, setIsNickNameAvailable] = useState(false);
  const [passwordPlag, setPasswordPlag] = useState(false);

  const [checkIdMessage, setCheckIdMessage] = useState("");
  const [checkMessage, setCheckMessage] = useState("");
  const [checkPwMessage, setCheckPwMessage] = useState("");
  const [checkNicknameMessage, setCheckNicknameMessage] = useState("");

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
      return;
    }

    if (!passwordPlag) {
      return;
    }

    if (!isNickNameAvailable) {
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
        url: `${process.env.REACT_APP_SERVER_URL}/upload/single`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((result) => {
        console.log(result.data);
        const res2 = axios({
          method: "POST",
          url: `${process.env.REACT_APP_SERVER_URL}/sign/signup`,
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

  // 아이디 중복 확인 버튼(실시간 유효성 검사 및 중복 검사)
  const checkIdAvailability = async () => {
    console.log("id", id);
    if (id !== null) {
      try {
        const res = await axios({
          method: "POST",
          url: `${process.env.REACT_APP_SERVER_URL}/sign/signup/checkid`,
          data: { id },
        });

        // 응답을 확인하고 메시지에 따라 처리
        // 사용 가능할때
        if (res.data.result === true) {
          setCheckIdMessage("아이디 : 사용 가능한 아이디입니다.");
          setIsIdAvailable(true);
        } else {
          setCheckIdMessage("아이디 : 이미 사용중인 아이디입니다.");
          setIsIdAvailable(false);
        }
      } catch (error) {
        console.error(error);
      }
    } else if (id === null) {
      setCheckMessage("아이디를 입력해주세요");
    }
  };

  //아이디 입력 필드에서 값이 변경될 때마다 실행되는 함수
  const handleIdChange = (e) => {
    const inputValue = e.target.value;
    setId(inputValue);
  };
  //다른 영역을 클릭했을 때 실행되는 함수
  const handleOutsideClick = (e) => {
    const target = e.target;
    //아이디 입력 필드가 아닌 다른 곳을 클릭했을 때
    if (target.className !== "signup_id_input") {
      if (id && id.trim().length > 0) {
        checkIdAvailability();
      }
    }
    if (target.className !== "signup_pwcheck_input") {
      if (pw && pw.trim().length > 0) {
        pwCheckButton();
      }
    }
    if (target.className !== "") {
      if (nickName && nickName.trim().length > 0) {
        checkNickButton();
      }
    }
  };

  useEffect(() => {
    //document 객체에 클릭 이벤트 리스너 추가
    document.addEventListener("click", handleOutsideClick);
    return () => {
      //컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [id, pw, checkPw, nickName]); //id 값 변경시 마다 useEffect 실행

  // 비밀번호 일치 버튼
  const pwCheckButton = () => {
    if (pw !== null && checkPw !== null) {
      // 비밀번호와 확인 비밀번호가 null이 아닌지 확인
      if (pw === checkPw) {
        // 비밀번호와 확인 비밀번호가 일치하는지 확인
        setCheckPwMessage("비밀번호가 일치합니다.");
        setPasswordPlag(true);
      } else {
        setCheckPwMessage("비밀번호가 서로 다릅니다.");
        setPasswordPlag(false);
      }
    } else {
      setCheckPwMessage("비밀번호를 입력해주세요.");
      setPasswordPlag(false);
    }
  };

  // 닉네임 중복 확인 버튼
  const checkNickButton = async () => {
    if (nickName !== null) {
      try {
        const res = await axios({
          method: "POST",
          url: `${process.env.REACT_APP_SERVER_URL}/sign/signup/checknickname`,
          data: { nickName },
        });

        // 응답을 확인하고 메시지에 따라 처리
        if (res.data.result === true) {
          setCheckNicknameMessage("닉네임 : 사용 가능한 닉네임입니다.");
          setIsNickNameAvailable(true);
        } else {
          setCheckNicknameMessage("닉네임 : 이미 사용중인 닉네임입니다.");
          setIsNickNameAvailable(false);
        }
      } catch (error) {
        console.error(error);
      }
    } else if (nickName === null) {
      setCheckMessage("닉네임을 입력해주세요.");
    }
  };

  //오늘 날짜 구하기
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];

  //전화번호 자동 하이픈 및 번호 입력만 받음
  const handleChange = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setTelNum(e.target.value);
    }
  };

  useEffect(() => {
    if (telNum.length === 10) {
      setTelNum(telNum.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    }
    if (telNum.length === 13) {
      setTelNum(
        telNum.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
  }, [telNum]);

  return (
    <div className="signup_container">
      <h1>회원가입</h1>
      <form className="signup_form" encType="multipart/form-data">
        <div className="signup_img">
          <div className="profile_box">
            <img src={imgFile ? imgFile : user_src} alt="프로필 이미지" />
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
            <img src={id_src} className="idImg" />
            <input
              type="text"
              placeholder="아이디"
              onChange={handleIdChange}
              className="signup_id_input"
            />
          </div>
          <div className="Box">
            <img src={pw_src} className="idImg" />
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
            <img src={pw_src} className="idImg" />
            <input
              type="password"
              placeholder="비밀번호 확인"
              className="signup_pwcheck_input"
              onChange={(e) => {
                setCheckPw(e.target.value);
              }}
            />
          </div>
        </div>

        {/* ----- 중복 확인 멘트 ------ */}
        {checkMessage && <div className="signup_check_box">{checkMessage}</div>}
        {checkIdMessage && (
          <div
            className={`signup_check_id ${!isIdAvailable ? "error-text" : ""}`}
          >
            {checkIdMessage}
          </div>
        )}
        {checkPwMessage && (
          <div
            className={`signup_check_pw ${!passwordPlag ? "error-text" : ""}`}
          >
            {checkPwMessage}
          </div>
        )}
        {checkNicknameMessage && (
          <div
            className={`signup_check_nickname ${
              !isNickNameAvailable ? "error-text" : ""
            }`}
          >
            {checkNicknameMessage}
          </div>
        )}

        <div className="signup_bottom">
          <div className="Box">
            <img src={id_src} className="idImg" />
            <input
              type="text"
              placeholder="이름"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="Box">
            <img src={id_src} className="idImg" />
            <input
              type="text"
              placeholder="닉네임"
              onChange={(e) => {
                setNickName(e.target.value);
              }}
            />
          </div>
          <div className="Box">
            <img src={birth_src} className="idImg" />
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
            <img src={phone_src} className="idImg" />
            <input
              type="text"
              placeholder="전화번호"
              onChange={handleChange}
              value={telNum}
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
