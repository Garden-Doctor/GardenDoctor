import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../store/isLogin";
import "../styles/topbar.scss";
import SideBar from "./SideBar";

const TopBar = () => {
  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const sidebarRef = useRef(null);

  const isLogin = useSelector((state) => state.isLogIn);
  const username = useSelector((state) => state.user);
  const dispatch = useDispatch();

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

        {isLogin ? (
          <button onClick={logoutButton}>로그아웃</button>
        ) : (
          <button onClick={loginButton}>로그인</button>
        )}
      </div>
      {isSidebarVisible && <SideBar ref={sidebarRef} onClose={closeSidebar} />}
    </div>
  );
};

export default TopBar;
