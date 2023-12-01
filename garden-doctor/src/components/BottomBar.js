import React, { useEffect, useState } from "react";
import { useNavigate, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { useSelectedButton } from "../components/SelectedButtonContext";

import "../styles/bottombar.scss";

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

  const { selectedButton, setSelectedButton } = useSelectedButton();

  useEffect(() => {
    // 페이지 이동 시 selectedButton 초기화
    setSelectedButton("home");
  }, [navigate]); // navigate가 변경될 때마다 useEffect 실행

  const homeButton = () => {
    navigate("/");
    setSelectedButton("home");
  };

  const boardButton = async () => {
    await navigate("/board");
    setSelectedButton("board");
  };

  const chatButton = async () => {
    await navigate("/chat");
    setSelectedButton("chat");
  };

  const myButton = async () => {
    if (!reduxUserId) {
      alert("로그인 해주세요");
      navigate("/login");
      return;
    }
    await navigate("/mypage");
    setSelectedButton("my");
  };

  return (
    <div className="BottomBar-container">
      <div className="BottomBar-container-inner">
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
    </div>
  );
};

export default BottomBar;
