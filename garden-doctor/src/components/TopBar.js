import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN, LOGOUT } from "../store/isLogin";

import "../sytles/topbar.scss";
import axios from "axios";

const TopBar = () => {
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

  console.log(isLogin);
  return (
    <div>
      <div style={{ width: "100%", height: "10vh", backgroundColor: "beige" }}>
        <span onClick={logoButton} style={{ border: "solid 1px black" }}>
          로고
        </span>

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
    </div>
  );
};

export default TopBar;
