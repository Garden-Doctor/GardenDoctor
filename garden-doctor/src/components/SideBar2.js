import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/sidebar2.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { bubble as Menu } from "react-burger-menu";

import { useSelectedButton } from "../components/SelectedButtonContext";

import exit_src from "../images/exit.svg";
import user_src from "../images/user.svg";

const SideBar2 = () => {
  const { selectedButton, setSelectedButton } = useSelectedButton();

  const userId = useSelector((state) => state.user);
  const [nickName, setNickName] = useState("");
  const [userImg, setUserImg] = useState("");

  const navigate = useNavigate();

  const refreshAndNavigate = (newPath) => {
    window.location.href = window.location.origin + newPath;
  };

  useEffect(() => {
    const myInfo = async () => {
      try {
        const myInfos = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/sign/myInfo`,
          {
            userId: userId,
          }
        );
        console.log("myInfos", myInfos.data);
        const url = myInfos.data.userImg;
        let cleanedUrl = url.replace(/^"(.*)"$/, "$1");

        console.log(cleanedUrl);
        setNickName(myInfos.data.nickName);
        setUserImg(cleanedUrl); //null인 경우 방지
      } catch (error) {
        console.log("error", error);
      }
    };
    myInfo();
  }, [userId]);

  const handleOnOpen = () => {};

  const showSettings = (event) => {
    event.preventDefault();
    // ...
    // Your logic for showSettings
  };

  var isMenuOpen = function (state) {
    return state.isOpen;
  };
  const dignoseButton = async () => {
    await refreshAndNavigate("/imageAI");
    setSelectedButton("home");
  };
  const chatButton = async () => {
    await refreshAndNavigate("/chat");
    setSelectedButton("chat");
  };
  const mypageButton = async () => {
    if (!userId) {
      alert("로그인 해주세요");
      await refreshAndNavigate("/login");
      setSelectedButton("my");
      return;
    }
    refreshAndNavigate("/mypage");
  };
  const boardButton = async () => {
    await refreshAndNavigate("/board");
    setSelectedButton("board");
  };
  const myplantButton = async () => {
    await refreshAndNavigate("/myPlants");
    setSelectedButton("my");
  };
  const myboardButton = async () => {
    await refreshAndNavigate("/myBoards");
    setSelectedButton("my");
  };

  return (
    <Menu
      // onOpen={handleOnOpen}
      onStateChange={isMenuOpen}
    >
      <div className="sidebar_top">
        <img alt="사람" src={userImg ? userImg : user_src} />
        <p>
          <span>{nickName}님</span>
          <sapn>환영합니다.</sapn>
        </p>
        <span onClick={mypageButton} className="mypage_button">
          마이페이지
        </span>
      </div>

      <span onClick={dignoseButton} className="menu-item" href="/">
        병충해 진단
      </span>
      <span onClick={chatButton} className="menu-item" href="/chat">
        AI 도우미
      </span>
      <span onClick={boardButton} className="menu-item" href="/board">
        소통의 정원
      </span>
      <span onClick={myplantButton} className="menu-item" href="/myplant">
        내 작물
      </span>
      <span onClick={myboardButton} className="menu-item" href="/myBoards">
        내 게시글
      </span>
      <a onClick={showSettings} className="menu-item--small" href=""></a>
    </Menu>
  );
};

export default SideBar2;
