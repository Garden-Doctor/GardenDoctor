import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const chatButton = () => {
    navigate("/chat");
  };

  const analysisButton = () => {
    navigate("/analysis");
  };

  const boardButton = () => {
    navigate("/board");
  };

  const simulButton = () => {
    navigate("/simulation");
  };

  return (
    <div
      style={{ height: "10vh", backgroundColor: "lightgray", width: "99vw" }}
    >
      <button onClick={chatButton}>채팅</button>
      <button onClick={analysisButton}>분석</button>
      <button onClick={boardButton}>게시판</button>
      <button onClick={simulButton}>시뮬</button>
    </div>
  );
};

export default Footer;
