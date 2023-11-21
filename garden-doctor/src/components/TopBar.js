import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN, LOGOUT } from "../store/isLogin";

import "../styles/topbar.scss";
import axios from "axios";
import SideBar from "./SideBar";

const TopBar = () => {
  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const sidebarRef = useRef(null);

  const isLogin = useSelector((state) => state.isLogIn);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

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

  const logoutButton = () => {
    dispatch({ type: LOGOUT });
    sessionStorage.removeItem("token");
    alert("로그아웃 되었습니다.");
  };

  const signupButton = () => {
    navigate("/signup");
  };

  const menuButton = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div>
      <div className="topbar-container">
        <div className="sidbar-container" onClick={menuButton}>
          <img src="imgs/menu.svg" id="menu" />
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
            <button onClick={signupButton}>회원가입</button>
          </>
        )}
      </div>
      {isSidebarVisible && <SideBar ref={sidebarRef} onClose={closeSidebar} />}
    </div>
  );
};

export default TopBar;
