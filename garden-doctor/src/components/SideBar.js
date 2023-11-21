import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/sidebar.scss";

const SideBar = ({ onClose }) => {
  const sideBarRef = useRef();

  const handleClickOutside = (event) => {
    if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const navigate = useNavigate();

  const dignoseButton = () => {
    navigate("/imageAI");
  };
  const chatButton = () => {
    navigate("/chatAI");
  };
  const mypageButton = () => {
    navigate("/mypage");
  };
  const boardButton = () => {
    navigate("/board");
  };
  const myplantButton = () => {
    navigate("/myplant");
  };
  const myboardButton = () => {
    navigate("/myboard");
  };

  return (
    <div className="sidebar-container" ref={sideBarRef}>
      <div className="sidebar_eixtbutton">
        <img alt="나가기" src="/imgs/exit.svg" onClick={onClose} />
      </div>
      <div className="sidebar_top">
        <img alt="사람" src="/imgs/user.svg" />
        <p>누구님</p>
        <span onClick={mypageButton}>마이페이지</span>
      </div>
      <div className="sidebar_menu">
        <span onClick={dignoseButton}>병충해 진단</span>
        <span onClick={chatButton} className="sidebar_border_inner">
          AI 도우미
        </span>
        <span onClick={boardButton} className="sidebar_border_inner">
          소통의 정원
        </span>
        <span onClick={myplantButton} className="sidebar_border_inner">
          내 작물
        </span>
        <span onClick={myboardButton} className="sidebar_border_inner">
          내 게시글
        </span>
      </div>
    </div>
  );
};

export default SideBar;
