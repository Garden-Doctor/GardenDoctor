import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../store/isLogin";

import "../styles/topbar.scss";

const TopBar = () => {
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
  return (
    <div>
      <div className="topbar-container">
        <div className="logo" onClick={logoButton}>
          <img src="imgs/logo.svg" />
        </div>

        {isLogin ? (
          <button onClick={logoutButton}>로그아웃</button>
        ) : (
          <button onClick={loginButton}>로그인</button>
        )}
      </div>
    </div>
  );
};

export default TopBar;
