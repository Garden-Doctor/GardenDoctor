import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../store/isLogin";

const NaviBar = () => {
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
      <div style={{ width: "100%", height: "10vh", backgroundColor: "beige" }}>
        <span onClick={logoButton} style={{ border: "solid 1px black" }}>
          로고
        </span>

        {isLogin ? (
          <button onClick={logoutButton}>로그아웃</button>
        ) : (
          <button onClick={loginButton}>로그인</button>
        )}
        <button onClick={signupButton}>회원가입</button>
      </div>
    </div>
  );
};

export default NaviBar;
