import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/sidebar.scss";
import { useSelector } from "react-redux";
import axios from "axios";

const SideBar = ({ onClose }) => {
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
    navigate("/chat");
  };
  const mypageButton = () => {
    if (!userId) {
      alert("로그인 해주세요");
      navigate("/login");
      return;
    }
    navigate("/mypage");
  };
  const boardButton = () => {
    navigate("/board");
  };
  const myplantButton = () => {
    navigate("/myplant");
  };
  const myboardButton = () => {
    navigate("/myBoardS");
  };

  return (
    <div className="sidebar-container" ref={sideBarRef}>
      <div className="sidebar_eixtbutton">
        <img alt="나가기" src="/imgs/exit.svg" onClick={onClose} />
      </div>
      <div className="sidebar_top">
        <img alt="사람" src={userImg} />
        <p>{nickName}</p>
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
