import React, { useState } from "react";
import axios from "axios";
import "../../styles/findMyIdPw.scss";

const FindMyId = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [foundId, setFoundId] = useState("");
  const [error, setError] = useState(null);

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

  return (
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
  );
};

export default FindMyId;
