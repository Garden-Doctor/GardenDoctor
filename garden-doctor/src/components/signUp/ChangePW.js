import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/findMyIdPw.scss";

import id_src from "../../images/id.svg";
import birth_src from "../../images/birth.svg";
import email_src from "../../images/email.svg";
import pw_src from "../../images/pw.svg";
import verification_src from "../../images/verification.svg";

const ChangePW = () => {
  const [pwName, setPwName] = useState("");
  const [pwEmail, setPwEmail] = useState("");
  const [pwId, setPwId] = useState("");
  const [certificationNumber, setCertificationNumber] = useState("");
  const [payLoad, setPayLoad] = useState("");
  const [check, setCheck] = useState(null);
  const [newPw, setNewPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [passwordPlag, setPasswordPlag] = useState(null);
  const [checkMessage, setCheckMessage] = useState("");
  const [pwNickname, setPwNickname] = useState("");
  const [pwBirthdate, setPwBirthdate] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const [isAvailable, setIsIdAvailable] = useState(false);
  const [checkMessageFindPw, setCheckMessageFindPw] = useState("");
  const [sendMaileMessage, setSendMaileMessage] = useState("");

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const target = e.target;
      if (target.className !== "signup_pwcheck_input") {
        pwCheckButton();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [newPw, pwCheck]);

  const sendEmail = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/sign/sendEmail",
        {
          pwEmail,
        }
      );
      console.log("response", response);
      setPayLoad(response.data.payload);
      setSendMaileMessage("메일이 전송되었습니다.");
    } catch (error) {
      console.log(error);
    }
  };
  const checkNumber = () => {
    if (payLoad === certificationNumber) {
      setCheck(true);
    } else {
      setCheck(false);
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
    if (
      !pwName ||
      !pwEmail ||
      !pwId ||
      !newPw ||
      !pwCheck ||
      !pwNickname ||
      !pwBirthdate
    ) {
      setCheckMessageFindPw("모든 필드를 입력해주세요.");
      return;
    }

    if (check == false || check == null) {
      setCheckMessageFindPw("이메일 인증을 해주세요.");
      return;
    }
    if (passwordPlag == false || passwordPlag == null) {
      setCheckMessageFindPw("비밀번호 일치 확인을 해주세요.");
      return;
    }
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
    } catch (error) {
      console.log("error", error);
      setUpdateSuccess(false);
    }
    console.log("updateSuccess", updateSuccess);
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
            <button onClick={sendEmail} className="check_button">
              전송
            </button>
          </div>
          <div className="sendmailmessage">{sendMaileMessage}</div>
          <div className="Box">
            <img src={verification_src} className="idImg" />
            <input
              type="text"
              placeholder="인증번호"
              className="PwNumberInput"
              value={certificationNumber}
              onChange={(e) => setCertificationNumber(e.target.value)}
            />
            <button onClick={checkNumber} className="check_button">
              확인
            </button>
          </div>
          <div className="checkID_message">
            {check === true && <div>인증 성공 </div>}
            {check === false && <div>인증 실패 </div>}
          </div>
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
        </div>
      </div>
      <button className="changePWbutton findIdbutton" onClick={findPw}>
        비밀번호 재설정
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
