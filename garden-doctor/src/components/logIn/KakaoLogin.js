import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const KakaoLogin = () => {
  const navigate = useNavigate();
  const [kakaoId, setKakaoId] = useState("");
  const [kakaoName, setKakaoName] = useState("");
  const [kakaoProfileImage, setKakaoProfileImage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const code = new URL(document.location.toString()).searchParams.get(
          "code"
        );
        console.log("code", code);

        if (code) {
          const res = await axios.post(
            `http://localhost:8000/sign/kakaoLogin`,
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

            const userId = response.data.id;
            const nickname = response.data.properties.nickname;
            const profileImage = response.data.properties.profile_image;

            setKakaoId(userId);
            setKakaoName(nickname);
            setKakaoProfileImage(profileImage);

            const userDataResponse = await axios.post(
              "http://localhost:8000/sign/kakaoUserData",
              {
                userId,
                name: nickname,
                nickname: nickname,
                userImg: profileImage,
              }
            );

            console.log("userDataResponse", userDataResponse);
          }

          navigate("/");
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [navigate]);

  return <div>카카오 로그인 중...</div>;
};

export default KakaoLogin;
