import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/bottombar.scss";
import { useSelector } from "react-redux";
import home from "../images/home.svg";
import home_selected from "../images/home_selected.svg";
import board from "../images/board.svg";
import board_selected from "../images/board_selected.svg";
import chat from "../images/chat.svg";
import chat_selected from "../images/chat_selected.svg";
import my from "../images/my.svg";
import my_selected from "../images/my_selected.svg";

const BottomBar = () => {
  const navigate = useNavigate();
  const reduxUserId = useSelector((state) => state.user);

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
    if (!reduxUserId) {
      alert("로그인 해주세요");
      navigate("/login");
      return;
    }
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
            src={selectedButton === "home" ? home_selected : home}
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
            src={selectedButton === "board" ? board_selected : board}
            alt="board"
          />
          소통의 정원
        </span>
        <span
          className={`BottomBar-chatButton ${
            selectedButton === "chat" ? "selected" : ""
          }`}
          onClick={chatButton}
        >
          <img
            src={selectedButton === "chat" ? chat_selected : chat}
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
          <img src={selectedButton === "my" ? my_selected : my} alt="my" />
          MY
        </span>
      </div>
    </>
  );
};

export default BottomBar;
