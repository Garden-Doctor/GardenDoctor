import { useEffect, useState, useRef } from "react";
import "../../styles/myPage/myPageEdit.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyPageEdit = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [prevNickName, setPrevNickName] = useState("");
  const [birth, setBirth] = useState("");
  const [telNum, setTelNum] = useState("");
  const [userImg, setUserImg] = useState("");
  const [pw, setPw] = useState("");
  const [checkPw, setCheckPw] = useState("");
  const [checkMessage, setCheckMessage] = useState("");
  const [loginType, setLoginType] = useState("");

  const [isNickNameAvailable, setIsNickNameAvailable] = useState(false);
  const [passwordPlag, setPasswordPlag] = useState(false);
  const fileInputRef = useRef(null);

  const imgRef = useRef();

  useEffect(() => {
    const myInfo = async () => {
      try {
        const myInfos = await axios.post("http://localhost:8000/sign/myInfo", {
          userId: userId,
        });
        console.log("myInfos", myInfos.data);
        const url = myInfos.data.userImg;
        let cleanedUrl = url.replace(/^"(.*)"$/, "$1");

        console.log(cleanedUrl);
        setName(myInfos.data.name);
        setNickName(myInfos.data.nickName);
        setPrevNickName(myInfos.data.nickName);
        setBirth(myInfos.data.birth || "생일정보가 없습니다."); //null인 경우 방지
        setTelNum(myInfos.data.telNum || "전화번호 정보가 없습니다."); //null인 경우 방지
        setUserImg(cleanedUrl || ""); //null인 경우 방지
        setLoginType(myInfos.data.loginType);
      } catch (error) {
        console.log("error", error);
      }
    };
    myInfo();
  }, [userId]);

  const saveImgFile = () => {
    const file = imgRef.current?.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUserImg(reader.result);
      };
    }
    console.log("userImg", userImg);
  };

  // 비밀번호 일치 버튼
  const pwCheckButton = () => {
    if (pw === checkPw) {
      setCheckMessage("비밀번호가 일치합니다.");
      setPasswordPlag(true);
    } else {
      setCheckMessage("비밀번호가 서로 다릅니다.");
      setPasswordPlag(false);
    }
  };

  const editButton = async (e) => {
    e.preventDefault();

    if (!pw) {
      setCheckMessage("비밀번호를 입력해주세요.");
      return;
    }

    if (!passwordPlag) {
      setCheckMessage("비밀번호 : 일치 확인을 눌러주세요");
      return;
    }

    if (!isNickNameAvailable) {
      setCheckMessage("닉네임 : 중복 확인을 눌러주세요");
      return;
    }

    const formData = new FormData();
    const files = fileInputRef.current.files;

    if (files[0] == null) {
      try {
        const res2 = axios({
          method: "POST",
          url: "http://localhost:8000/sign/edit",
          data: {
            userId,
            pw,
            name,
            nickName,
            birth,
            telNum,
            img: userImg,
          },
        });
        navigate("/myPage");
      } catch (error) {
        console.log(error);
      }
    } else {
      // 이미지를 변경하지 않았을 때 기존 이미지 URL을 서버로 보냄
      const file = imgRef;
      formData.append("file", file);

      console.log("formData", formData);
      try {
        const res = await axios({
          method: "POST",
          url: "http://localhost:8000/upload/single",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((result) => {
          console.log("result", result.data);
          const res2 = axios({
            method: "POST",
            url: "http://localhost:8000/sign/edit",
            data: {
              userId,
              pw,
              name,
              nickName,
              birth,
              telNum,
              img: result.data,
            },
          });
          console.log(res2);
        });
        navigate("/myPage");
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 닉네임 중복 확인 버튼
  const checkNickButton = async () => {
    if (prevNickName !== nickName) {
      try {
        const res = await axios({
          method: "POST",
          url: "http://localhost:8000/sign/signup/checknickname",
          data: { nickName },
        });

        // 응답을 확인하고 메시지에 따라 처리
        if (res.data.result === true) {
          setCheckMessage("닉네임 : 사용 가능한 닉네임입니다.");
          setIsNickNameAvailable(true);
        } else {
          setCheckMessage("닉네임 : 이미 사용중인 닉네임입니다.");
          setIsNickNameAvailable(false);
        }
      } catch (error) {
        console.error(error);
      }
    } else if (prevNickName === nickName) {
      setCheckMessage("닉네임: 변경사항이 없습니다.");
      setIsNickNameAvailable(true);
    }
  };

  return (
    <div className="myPageEdit-main-container">
      <h1>내 정보 수정</h1>
      <form className="edit_form" encType="multipart/form-data">
        <div className="edit_img">
          <div className="profile_box">
            <img src={userImg} alt="프로필 이미지" />
          </div>
          <label className="edit-profileImg-label" htmlFor="profileImg">
            프로필 이미지 변경
          </label>
          <input
            className="edit-profileImg-input"
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={saveImgFile}
            ref={(ref) => (fileInputRef.current = ref)}
          />
        </div>
        <div className="edit_top">
          <div className="Box">
            <img src="imgs/id.svg" className="idImg" />
            <h1 className="edit_id_input">{userId}</h1>
          </div>
          <div className="Box">
            <img src="imgs/password.svg" className="idImg" />
            <input
              type="password"
              placeholder="비밀번호"
              className="edit_pw_input"
              onChange={(e) => {
                setPw(e.target.value);
              }}
            />
          </div>
          <div className="Box">
            <img src="imgs/password.svg" className="idImg" />
            <input
              type="password"
              placeholder="비밀번호 확인"
              className="edit_pwcheck_input"
              onChange={(e) => {
                setCheckPw(e.target.value);
              }}
            />
            <button
              className="check_button"
              type="button"
              onClick={pwCheckButton}
            >
              일치 확인
            </button>
          </div>
        </div>
        {/* ----- 중복 확인 멘트 ------ */}
        <div className="edit_check_box">{checkMessage}</div>

        <div className="edit_bottom">
          <div className="Box">
            <img src="imgs/id.svg" className="idImg" />
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="Box">
            <img src="imgs/id.svg" className="idImg" />
            <input
              type="text"
              value={nickName}
              onChange={(e) => {
                setNickName(e.target.value);
              }}
            />
            <button
              type="button"
              className="check_button"
              onClick={checkNickButton}
            >
              중복 확인
            </button>
          </div>
          <div className="Box">
            <img src="imgs/birth.svg" className="idImg" />
            <input
              type="date"
              value={birth}
              onChange={(e) => {
                setBirth(e.target.value);
              }}
            />
          </div>
          <div className="Box">
            <img src="imgs/phone.svg" className="idImg" />
            <input
              type="text"
              value={telNum}
              onChange={(e) => {
                setTelNum(e.target.value);
              }}
            />
          </div>
        </div>

        <button className="register_button" onClick={editButton}>
          수정하기
        </button>
      </form>
    </div>
  );
};

export default MyPageEdit;
