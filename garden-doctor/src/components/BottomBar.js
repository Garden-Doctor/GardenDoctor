import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/bottombar.scss";

const BottomBar = () => {
  const navigate = useNavigate();

  const [selectedButton, setSelectedButton] = useState(null);

  const homeButton = () => {
    navigate("/");
    setSelectedButton("home");
  };

  const boardButton = () => {
    navigate("/board");
    setSelectedButton("board");
  };

  const chatButton = () => {
    navigate("/chat");
    setSelectedButton("chat");
  };

  const myButton = () => {
    navigate("/mypage");
    setSelectedButton("my");
  };

  return (
    <>
      <div className="BottomBar-container">
        <span
          className={`BottomBar-homeButton ${
            selectedButton === "home" ? "selected" : ""
          }`}
          onClick={homeButton}
        >
          <img
            src={
              selectedButton === "home"
                ? "imgs/home_selected.svg"
                : "imgs/home.svg"
            }
            alt="home"
          />
          홈
        </span>
        <span
          className={`BottomBar-boardButton ${
            selectedButton === "board" ? "selected" : ""
          }`}
          onClick={boardButton}
        >
          <img
            src={
              selectedButton === "board"
                ? "imgs/board_selected.svg"
                : "imgs/board.svg"
            }
            alt="board"
          />
          게시판
        </span>
        <span
          className={`BottomBar-chatButton ${
            selectedButton === "chat" ? "selected" : ""
          }`}
          onClick={chatButton}
        >
          <img
            src={
              selectedButton === "chat"
                ? "imgs/chat_selected.svg"
                : "imgs/chat.svg"
            }
            alt="chat"
          />
          채팅봇
        </span>
        <span
          className={`BottomBar-myButton ${
            selectedButton === "my" ? "selected" : ""
          }`}
          onClick={myButton}
        >
          <img
            src={
              selectedButton === "my" ? "imgs/my_selected.svg" : "imgs/my.svg"
            }
            alt="my"
          />
          MY
        </span>
      </div>
    </>
  );
};

export default BottomBar;
