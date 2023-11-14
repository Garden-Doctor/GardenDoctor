import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/bottombar.scss";

const BottomBar = () => {
  const navigate = useNavigate();

  const homeButton = () => {
    navigate("/");
  };

  const boardButton = () => {
    navigate("/board");
  };

  const chatButton = () => {
    navigate("/chat");
  };

  const menuButton = () => {
    console.log("메뉴 버튼 클릭");
  };

  return (
    <>
      <div className="BottomBar-container">
        <span className="BottomBar-homeButton" onClick={homeButton}>
          <img src="imgs/home.svg" />홈
        </span>
        <span className="BottomBar-boardButton" onClick={boardButton}>
          <img src="imgs/board_green.svg" />
          게시판
        </span>
        <span className="BottomBar-chatButton" onClick={chatButton}>
          <img src="imgs/chat.svg" />
          채팅봇
        </span>
        <span className="BottomBar-menuButton" onClick={menuButton}>
          <img src="imgs/menu.svg" />
          메뉴
        </span>
      </div>
    </>
  );
};

export default BottomBar;
