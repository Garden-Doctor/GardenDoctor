import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const boardButton = () => {
    navigate("/board");
  };

  return (
    <div
      style={{ height: "10vh", backgroundColor: "lightgray", width: "99vw" }}
    >
      <button onClick={chatButton}>홈</button>
      <button onClick={analysisButton}>게시판</button>
      <button onClick={boardButton}>채팅봇</button>
      <button onClick={simulButton}>메뉴</button>
    </div>
  );
};

export default Footer;
