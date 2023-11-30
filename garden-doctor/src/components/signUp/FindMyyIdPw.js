import React, { useState } from "react";
import axios from "axios";
import "../../styles/findMyIdPw.scss";

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
      <div className="findMyId">
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="date"
          placeholder="생년월일"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
        <button onClick={handleFindId}>찾기</button>
        {foundId && <p>찾은 아이디: {foundId}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div className="findMyPw">
        <input
          type="text"
          placeholder="이름"
          value={pwName}
          onChange={(e) => setPwName(e.target.value)}
        />
        <input
          type="text"
          placeholder="아이디"
          value={pwId}
          onChange={(e) => setPwId(e.target.value)}
        />
        <input
          type="text"
          placeholder="닉네임"
          value={pwNickname}
          onChange={(e) => setPwNickname(e.target.value)}
        />
        <input
          type="date"
          placeholder="생년월일"
          value={pwBirthdate}
          onChange={(e) => setPwBirthdate(e.target.value)}
        />
        <input
          type="text"
          placeholder="이메일"
          value={pwEmail}
          onChange={(e) => setPwEmail(e.target.value)}
        />
        <button onClick={sendEmail}>인증번호 받기</button>
        <div>{sendMaileMessage}</div>
        <input
          type="text"
          placeholder="인증번호"
          value={certificationNumber}
          onChange={(e) => setCertificationNumber(e.target.value)}
        />
        <button onClick={checkNumber}>인증번호 확인</button>
        {check === true && <div>인증 성공 </div>}
        {check === false && <div>인증 실패 </div>}
        <input
          type="password"
          placeholder="비밀번호"
          className="signup_pw_input"
          value={newPw}
          onChange={(e) => {
            setNewPw(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          className="signup_pwcheck_input"
          value={pwCheck}
          onChange={(e) => {
            setPwCheck(e.target.value);
          }}
        />
        <button className="check_button" type="button" onClick={pwCheckButton}>
          일치 확인
        </button>
        <button onClick={findPw}>비밀번호 재설정 하기</button>
        <div>{checkMessageFindPw}</div>
        {updateSuccess === true && <div>비밀번호 재설정 성공</div>}
        {updateSuccess === false && <div>재설정 실패</div>}
      </div>
    </div>
  );
};

export default FindMyId;
