import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/sidebar2.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { slide as Menu } from "react-burger-menu";

import { useSelectedButton } from "../components/SelectedButtonContext";

import exit_src from "../images/exit.svg";
import user_src from "../images/user.svg";

const SideBar = () => {
  const { selectedButton, setSelectedButton } = useSelectedButton();

  const sideBarRef = useRef();
  const userId = useSelector((state) => state.user);
  const [nickName, setNickName] = useState("");
  const [userImg, setUserImg] = useState("");

  console.log("userid", userId);

  useEffect(() => {
    const myInfo = async () => {
      try {
        const myInfos = await axios.post("http://localhost:8000/sign/myInfo", {
          userId: userId,
        });
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

  const showSettings = (event) => {
    event.preventDefault();
    // ...
    // Your logic for showSettings
  };

  const closeAllMenusOnEsc = (e) => {
    e = e || window.event;

    if (e.key === "Escape" || e.keyCode === 27) {
      this.setState({ areMenusOpen: false });
    }
  };
  var isMenuOpen = function (state) {
    return state.isOpen;
  };

  return (
    <Menu
      onOpen={handleOnOpen}
      onStateChange={isMenuOpen}
      customOnKeyDown={closeAllMenusOnEsc}
    >
      <a id="dignose" className="menu-item" href="/">
        병충해 진단
      </a>
      <a id="dignose" className="menu-item" href="/chat">
        AI 도우미
      </a>
      <a id="dignose" className="menu-item" href="/board">
        소통의 정원
      </a>
      <a id="dignose" className="menu-item" href="/myplant">
        내 작물
      </a>
      <a id="dignose" className="menu-item" href="/myBoards">
        내 게시글
      </a>
      <a onClick={this.showSettings} className="menu-item--small" href="">
        Settings
      </a>
    </Menu>
  );
};

export default SideBar;
