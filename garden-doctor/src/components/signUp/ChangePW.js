import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/findMyIdPw.scss";

import id_src from "../../images/id.svg";
import birth_src from "../../images/birth.svg";
import email_src from "../../images/email.svg";
import pw_src from "../../images/pw.svg";
import verification_src from "../../images/verification.svg";
import { useNavigate } from "react-router";

const ChangePW = () => {
  const [pwName, setPwName] = useState("");
  const [pwEmail, setPwEmail] = useState("");
  const [pwId, setPwId] = useState("");
  const [certificationNumber, setCertificationNumber] = useState("");
  const [payLoad, setPayLoad] = useState("");
  const [check, setCheck] = useState(null);
  const [newPw, setNewPw] = useState(null);
  const [pwCheck, setPwCheck] = useState(null);
  const [passwordPlag, setPasswordPlag] = useState(null);
  const [checkMessage, setCheckMessage] = useState(null);
  const [pwNickname, setPwNickname] = useState("");
  const [pwBirthdate, setPwBirthdate] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const [isAvailable, setIsIdAvailable] = useState(false);
  const [checkMessageFindPw, setCheckMessageFindPw] = useState("");
  const [sendMaileMessage, setSendMaileMessage] = useState("");

  //찾기 버튼 메시지용.
  const [findIdButtonMessage, setFindIdButtonMessage] =
    useState("인증메일 보내기");
  //확인 상태
  const [findIdButtonState, setFindIdButtonState] = useState("sendEmail");
  const [showNumberDiv, setShowNumberDiv] = useState(false);
  const [showSetPw, setShowSetPw] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const target = e.target;
      if (target.className !== "signup_pwcheck_input lastBox") {
        if (newPw && newPw.trim().length > 0) {
          pwCheckButton();
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [newPw, pwCheck]);

  //이메일 유효성 검사
  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    return emailRegex.test(email);
  };

  const sendEmail = async () => {
    if (!validateEmail(pwEmail)) {
      setCheckMessage("이메일이 올바르지 않습니다.");
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/sign/sendEmail",
        {
          pwEmail,
        }
      );
      console.log("response", response);
      setPayLoad(response.data.payload);
      setFindIdButtonMessage("인증하기");
      setFindIdButtonState("checkNumber");
      setShowNumberDiv(true);
    } catch (error) {
      console.log(error);
    }
  };
  const checkNumber = () => {
    if (payLoad === certificationNumber) {
      setCheck(true);
      setCheckMessage("인증 완료");
      setFindIdButtonMessage("비밀번호 재설정");
      setFindIdButtonState("setPw");
      setShowSetPw(true);
    } else {
      setCheck(false);
      setCheckMessage("인증번호가 틀렸습니다.");
    }
  };

  const pwCheckButton = () => {
    if (newPw !== null) {
      if (newPw === pwCheck) {
        setCheckMessage("비밀번호가 일치합니다.");
        setPasswordPlag(true);
      } else {
        setCheckMessage("비밀번호가 서로 다릅니다.");
        setPasswordPlag(false);
      }
    } else if (newPw === null) {
      setCheckMessage("비밀번호를 입력해주세요.");
    }
  };
  const findPw = async () => {
    if (findIdButtonState === "sendEmail") {
      sendEmail();
    } else if (findIdButtonState === "checkNumber") {
      checkNumber();
    } else if (findIdButtonState === "setPw") {
      // if (
      //   !pwName ||
      //   !pwEmail ||
      //   !pwId ||
      //   !newPw ||
      //   !pwCheck ||
      //   !pwNickname ||
      //   !pwBirthdate
      // ) {
      //   setCheckMessageFindPw("모든 필드를 입력해주세요.");
      //   return;
      // }

      // if (check == false || check == null) {
      //   setCheckMessageFindPw("이메일 인증을 해주세요.");
      //   return;
      // }
      // if (passwordPlag == false || passwordPlag == null) {
      //   setCheckMessageFindPw("비밀번호 일치 확인을 해주세요.");
      //   return;
      // }
      try {
        const response = await axios.post("http://localhost:8000/sign/findPw", {
          pwName,
          pwId,
          pwNickname,
          pwBirthdate,
          newPw,
        });
        console.log("response", response);
        setUpdateSuccess(true);
        navigate("/login");
      } catch (error) {
        console.log("error", error);
        setUpdateSuccess(false);
      }
      console.log("updateSuccess", updateSuccess);
    }
  };

  return (
    <div className="chagePW-container">
      <h3>비밀번호 재설정</h3>
      <div className="findMyIDPW-container-findPW">
        <div className="textPw">
          <div className="Box">
            <img src={id_src} className="idImg" />
            <input
              type="text"
              placeholder="이름"
              value={pwName}
              className="PwNameInput"
              onChange={(e) => setPwName(e.target.value)}
            />
          </div>
          <div className="Box">
            <img src={id_src} className="idImg" />
            <input
              type="text"
              placeholder="아이디"
              value={pwId}
              className="PwIdInput"
              onChange={(e) => setPwId(e.target.value)}
            />
          </div>
          <div className="Box">
            <img src={id_src} className="idImg" />
            <input
              type="text"
              placeholder="닉네임"
              className="PwNickNameInput"
              value={pwNickname}
              onChange={(e) => setPwNickname(e.target.value)}
            />
          </div>
          <div className="Box">
            <img src={birth_src} className="idImg" />
            <input
              type="date"
              placeholder="생년월일"
              className="PwBirthInput"
              value={pwBirthdate}
              onChange={(e) => setPwBirthdate(e.target.value)}
            />
          </div>
          <div className="Box">
            <img src={email_src} className="idImg" />
            <input
              type="text"
              placeholder="이메일"
              className="PwEmaileInput"
              value={pwEmail}
              onChange={(e) => setPwEmail(e.target.value)}
            />
          </div>

          {showNumberDiv === true && (
            <div className="Box">
              <img src={verification_src} className="idImg" />
              <input
                type="text"
                placeholder="인증번호"
                className="PwNumberInput"
                value={certificationNumber}
                onChange={(e) => setCertificationNumber(e.target.value)}
              />
            </div>
          )}

          {showSetPw === true && (
            <div className="Box">
              <img src={pw_src} className="idImg" />
              <input
                type="password"
                placeholder="비밀번호"
                className="signup_pw_input"
                value={newPw}
                onChange={(e) => {
                  setNewPw(e.target.value);
                }}
              />
            </div>
          )}
          {showSetPw === true && (
            <div className="Box">
              <img src={pw_src} className="idImg" />
              <input
                type="password"
                placeholder="비밀번호 확인"
                className="signup_pwcheck_input lastBox"
                value={pwCheck}
                onChange={(e) => {
                  setPwCheck(e.target.value);
                }}
              />
            </div>
          )}
        </div>
      </div>
      <button className="changePWbutton findIdbutton" onClick={findPw}>
        {findIdButtonMessage}
      </button>
      {checkMessage && (
        <div className={`signup_check_pw ${!passwordPlag ? "error-text" : ""}`}>
          {checkMessage}
        </div>
      )}
      <div>{checkMessageFindPw}</div>
      {updateSuccess === true && <div>비밀번호 재설정 성공</div>}
      {updateSuccess === false && <div>재설정 실패</div>}
    </div>
  );
};

export default ChangePW;
