import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/findMyIdPw.scss";

import id_src from "../../images/id.svg";
import birth_src from "../../images/birth.svg";
import email_src from "../../images/email.svg";
import pw_src from "../../images/pw.svg";
import verification_src from "../../images/verification.svg";
import ChangePW from "./ChangePW";

const FindMyId = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [foundId, setFoundId] = useState("");
  const [error, setError] = useState(null);

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

  const handleFindId = async () => {
    try {
      // 서버에 요청을 보내서 아이디 찾기
      const response = await axios.post("http://localhost:8000/sign/findId", {
        name,
        nickname,
        birth: birthdate,
      });

      // 찾은 아이디를 상태에 업데이트
      setFoundId(response.data.foundId);
      setError(null); // 에러가 있었다면 초기화
    } catch (error) {
      console.error("Error finding ID:", error);
      setError("아이디를 찾는 중에 오류가 발생했습니다.");
      setFoundId(""); // 에러가 발생했을 때는 찾은 아이디를 초기화
    }
  };

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
    <div>
      <div className="findMyIDPW-container">
        <h3>아이디 찾기</h3>
        <div className="findMyIDPW-container-findID">
          <div className="Box">
            <img src={id_src} className="idImg" />
            <input
              type="text"
              placeholder="이름"
              className="IdNameInput"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="Box">
            <img src={id_src} className="idImg" />
            <input
              type="text"
              placeholder="닉네임"
              className="IdNicknameInput"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="Box">
            <img src={birth_src} className="idImg" />
            <input
              type="date"
              placeholder="생년월일"
              className="IdBirthInput lastBox"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
        </div>
        <button className="findIdbutton" onClick={handleFindId}>
          아이디 찾기
        </button>
        <div className="findIDmessage">
          {foundId && <p>찾은 아이디: {foundId}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <ChangePW />
      </div>
    </div>
  );
};

export default FindMyId;
