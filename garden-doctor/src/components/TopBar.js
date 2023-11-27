import React, { useEffect, userId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN, LOGOUT } from "../store/isLogin";

import "../styles/topbar.scss";
import axios from "axios";
import SideBar from "./SideBar";

const TopBar = () => {
  const isLogin = useSelector((state) => state.isLogIn);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user);
  console.log("userId", userId);

  const [loading, setLoading] = useState(true);

  //SideBar 관련

  const [isSideBarVisible, setSideBarVisible] = useState(false);

  const handleMenuButtonClick = () => {
    setSideBarVisible(!isSideBarVisible);
  };

  const handleCloseSideBar = () => {
    setSideBarVisible(false);
  };

  // //SideBar 관련

  useEffect(() => {
    const jwtToken = sessionStorage.getItem("token");

    if (jwtToken) {
      axios
        .post("http://localhost:8000/sign/verify", { token: jwtToken })
        .then((response) => {
          const user = response.data.user.id;
          dispatch({ type: LOGIN, user: user });
        })
        .catch((error) => {
          dispatch({ type: LOGOUT });
          console.error("JWT verification error:", error);
        });
      setLoading(false);
    } else {
      dispatch({ type: LOGOUT });
      setLoading(false);
    }
  }, []);

  const navigate = useNavigate();
  const logoButton = () => {
    navigate("/");
  };

  const loginButton = () => {
    navigate("/login");
  };

  const Rest_api_key = process.env.REACT_APP_KAKAO_INIT_KEY;
  const redirect_uri = process.env.REACT_APP_KAKAO_LOGOUT_REDIRECT_URI;

  const logoutButton = async () => {
    const findLoginType = await axios.post(
      "http://localhost:8000/sign/findLoginType",
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

  const signupButton = () => {
    navigate("/signup");
  };

  return (
    <div>
      <div className="topbar-container">
        <div id="sidbar-container">
          <img src="imgs/menu.svg" id="menu" onClick={handleMenuButtonClick} />
        </div>
        <div className="logo" onClick={logoButton}>
          <img src="imgs/logo.svg" id="logo-img" />
        </div>

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

      {isSideBarVisible && <SideBar onClose={handleCloseSideBar} />}
    </div>
  );
};

export default TopBar;
