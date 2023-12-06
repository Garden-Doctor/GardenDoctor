import React, { useEffect, userId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN, LOGOUT } from "../store/isLogin";
import menu from "../images/menu.svg";
import logo from "../images/logo.svg";

import "../styles/topbar.scss";
import axios from "axios";
import SideBar from "./SideBar";

import { useSelectedButton } from "../components/SelectedButtonContext";

const TopBar = () => {
  const { selectedButton, setSelectedButton } = useSelectedButton();

  const isLogin = useSelector((state) => state.isLogIn);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user);
  console.log("userId", userId);

  const [loading, setLoading] = useState(true);

  //SideBar 관련

  const [isSideBarVisible, setSideBarVisible] = useState(false);

  const handleMenuButtonClick = () => {
    setSideBarVisible(!isSideBarVisible);
    console.log("메뉴 열림");
  };

  const handleCloseSideBar = () => {
    setSideBarVisible(false);
  };

  // //SideBar 관련

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = sessionStorage.getItem("token");

        if (jwtToken) {
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/sign/verify`,
            { token: jwtToken }
          );
          const user = response.data.user.id;

          const userResponse = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/sign/myInfo`,
            { userId: user }
          );
          const nickName = userResponse.data.nickName;

          dispatch({ type: LOGIN, user: user, nickname: nickName });
        } else {
          dispatch({ type: LOGOUT });
        }
      } catch (error) {
        dispatch({ type: LOGOUT });
        console.error("JWT verification error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // 빈 배열을 전달하여 마운트될 때 한 번만 실행되도록 설정

  const navigate = useNavigate();
  const logoButton = () => {
    navigate("/");
    setSelectedButton("home");
  };

  const loginButton = () => {
    navigate("/login");
    setSelectedButton("home");
  };

  const Rest_api_key = process.env.REACT_APP_KAKAO_INIT_KEY;
  const redirect_uri = process.env.REACT_APP_KAKAO_LOGOUT_REDIRECT_URI;

  const logoutButton = async () => {
    setSelectedButton("home");
    const findLoginType = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/sign/findLoginType`,
      {
        userId,
      }
    );
    console.log("findLoginType", findLoginType);
    if (findLoginType === "kakao") {
      window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${Rest_api_key}&logout_redirect_uri=${redirect_uri}`;
    }
    dispatch({ type: LOGOUT });
    sessionStorage.removeItem("token");
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <>
      <div className="topbar-container">
        <div>
          <div id="sidbar-container">
            <img src={menu} id="menu" onClick={handleMenuButtonClick} />
          </div>
          <div className="logo" onClick={logoButton}>
            <img src={logo} id="logo-img" />
          </div>
          <div className="last">
            {loading ? (
              <div>loading...</div>
            ) : isLogin ? (
              <button onClick={logoutButton}>로그아웃</button>
            ) : (
              <>
                <button onClick={loginButton}>로그인</button>
                {/* <button onClick={signupButton}>회원가입</button> */}
              </>
            )}
          </div>
        </div>
      </div>
      {isSideBarVisible && <SideBar onClose={handleCloseSideBar} />}
    </>
  );
};

export default TopBar;
