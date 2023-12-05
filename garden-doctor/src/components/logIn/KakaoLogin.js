import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../../store/isLogin";

const KakaoLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [kakaoID, setKakaoId] = useState(" ");
  let userNickname = "";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const code = new URL(document.location.toString()).searchParams.get(
          "code"
        );
        console.log("code", code);

        if (code) {
          const res = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/sign/kakaoLogin`,
            { code }
          );
          console.log("res", res);
          const kakaoToken = res.data.access_token;

          if (kakaoToken) {
            const response = await axios.get(
              "https://kapi.kakao.com/v2/user/me",
              {
                headers: { Authorization: `Bearer ${kakaoToken}` },
              }
            );
            console.log("kakaoResponse: ", response);
            console.log("id: ", response.data.id);
            console.log("nickname: ", response.data.properties.nickname);
            console.log(
              "profile_image: ",
              response.data.properties.profile_image
            );
            userNickname = response.data.properties.nickname;

            const userId = response.data.id;
            const nickname = response.data.properties.nickname;
            const profileImage = response.data.properties.profile_image;

            setKakaoId(userId);

            const userDataResponse = await axios.post(
              `${process.env.REACT_APP_SERVER_URL}/sign/kakaoUserData`,
              {
                userId,
                name: nickname,
                nickname: nickname,
                userImg: profileImage,
              }
            );

            const loginKaKao = await axios.post(
              `${process.env.REACT_APP_SERVER_URL}/sign/makeToken`,
              {
                userId,
              }
            );

            sessionStorage.setItem("token", loginKaKao.data.token);
            dispatch({
              type: LOGIN,
              user: String(loginKaKao.data.id),
              nickname: userNickname,
            });
            console.log("userDataResponse", userDataResponse);
          }

          navigate("/");
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [navigate, dispatch, kakaoID]);

  return <div>카카오 로그인 중...</div>;
};

export default KakaoLogin;
