import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { LOGIN, LOGOUT } from "../store/isLogin";

const Home = () => {
  const isLogin = useSelector((state) => state.isLogIn);
  const username = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
    } else {
      dispatch({ type: LOGOUT });
    }
  }, []);

  return (
    <div>
      {isLogin ? <p>Welcome, {username}!</p> : <p>Please log in.</p>}
      <h1>Home</h1>
    </div>
  );
};

export default Home;
