import { useEffect, useState, useRef } from "react";
import "../../styles/myPage/myPageEdit.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import passwordImg from "../../images/password.svg";
import IdImg from "../../images/id.svg";
import BirthImg from "../../images/birth.svg";
import PhoneImg from "../../images/phone.svg";

const MyPageEdit = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [prevNickName, setPrevNickName] = useState("");
  const [birth, setBirth] = useState("");
  const [telNum, setTelNum] = useState("");
  const [userImg, setUserImg] = useState("");
  const [pw, setPw] = useState(null);
  const [checkPw, setCheckPw] = useState("");
  const [checkPwMessage, setCheckPwMessage] = useState("");
  const [nickNameMessage, setNickNameMessage] = useState("");
  const [loginType, setLoginType] = useState("");
  const [imageSelected, setImageSelected] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [telMessage, setTelMessage] = useState("");

  const [isNickNameAvailable, setIsNickNameAvailable] = useState(false);
  const [passwordPlag, setPasswordPlag] = useState(false);
  const fileInputRef = useRef(null);

  const imgRef = useRef();

  useEffect(() => {
    const myInfo = async () => {
      try {
        const myInfos = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/sign/myInfo`,
          {
            userId: userId,
          }
        );
        console.log("myInfos", myInfos.data);
        const url = myInfos.data.userImg;
        let cleanedUrl = url.replace(/^"(.*)"$/, "$1");

        console.log(cleanedUrl);
        setName(myInfos.data.name);
        setNickName(myInfos.data.nickName);
        setPrevNickName(myInfos.data.nickName);
        setBirth(myInfos.data.birth || "생일정보가 없습니다."); //null인 경우 방지
        setTelNum(myInfos.data.telNum || ""); //null인 경우 방지
        if (myInfos.data.telNum == null && myInfos.data.telNum === "") {
          setTelMessage("저장된 전화번호가 없습니다.");
        }
        setUserImg(cleanedUrl || ""); //null인 경우 방지
        setLoginType(myInfos.data.loginType);
      } catch (error) {
        console.log("error", error);
      }
    };
    myInfo();
  }, [userId]);

  const saveImgFile = () => {
    const file = fileInputRef.current.files[0];
    setImageSelected(true);
    console.log(file);

    // 이미지 미리보기 URL 설정
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleOutsideClick = (e) => {
    const target = e.target;
    if (target.className !== "edit_pwcheck_input") {
      pwCheckButton();
    }
    if (target.className !== "edit_nickName_input") {
      checkNickButton();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [pw, checkPw, nickName]);

  // 비밀번호 일치 버튼
  const pwCheckButton = () => {
    if (pw !== null) {
      if (pw === checkPw) {
        setCheckPwMessage("비밀번호가 일치합니다.");
        setPasswordPlag(true);
      } else {
        setCheckPwMessage("비밀번호가 서로 다릅니다.");
        setPasswordPlag(false);
      }
    } else if (pw === null) {
      setCheckPwMessage("비밀번호를 입력해주세요.");
    }
  };

  const editButton = async (e) => {
    e.preventDefault();

    if (!pw) {
      return;
    }

    if (!passwordPlag) {
      return;
    }

    if (!isNickNameAvailable) {
      return;
    }

    const files = fileInputRef.current.files;

    if (files[0] == null) {
      try {
        const res2 = axios({
          method: "POST",
          url: `${process.env.REACT_APP_SERVER_URL}/sign/edit`,
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
      const formData = new FormData();
      formData.append("file", files[0]);

      console.log("formData", formData);
      try {
        const res = await axios({
          method: "POST",
          url: `${process.env.REACT_APP_SERVER_URL}/upload/single`,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((result) => {
          console.log("result", result.data);
          const res2 = axios({
            method: "POST",
            url: `${process.env.REACT_APP_SERVER_URL}/sign/edit`,
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
    if (nickName !== null) {
      if (prevNickName !== nickName) {
        try {
          const res = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_SERVER_URL}/sign/signup/checknickname`,
            data: { nickName },
          });

          // 응답을 확인하고 메시지에 따라 처리
          if (res.data.result === true) {
            setNickNameMessage("닉네임 : 사용 가능한 닉네임입니다.");
            setIsNickNameAvailable(true);
          } else {
            setNickNameMessage("닉네임 : 이미 사용중인 닉네임입니다.");
            setIsNickNameAvailable(false);
          }
        } catch (error) {
          console.error(error);
        }
      } else if (prevNickName === nickName) {
        setNickNameMessage("닉네임: 변경사항이 없습니다.");
        setIsNickNameAvailable(true);
      }
    } else if (nickName === null) {
      setNickNameMessage("닉네임을 입력해주세요.");
    }
  };
  //오늘 날짜 계산
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];

  //전화번호 자동 하이픈 및 번호 입력만 받음
  const handleChange = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setTelNum(e.target.value);
    }
  };

  useEffect(() => {
    if (telNum.length === 10) {
      setTelNum(telNum.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    }
    if (telNum.length === 13) {
      setTelNum(
        telNum.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
  }, [telNum]);

  return (
    <div className="myPageEdit-main-container">
      <h1>내 정보 수정</h1>
      <form className="edit_form" encType="multipart/form-data">
        <div className="edit_img">
          {imageSelected ? (
            <div className="profile_box">
              <img src={imagePreviewUrl} alt="프로필 이미지" />
            </div>
          ) : (
            <div className="profile_box">
              <img src={userImg} alt="프로필 이미지" />
            </div>
          )}

          <label className="edit-profileImg-label" htmlFor="profileImg">
            프로필 이미지 변경
          </label>
          <input
            className="edit-profileImg-input"
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={saveImgFile}
            ref={fileInputRef}
          />
        </div>
        <div className="edit_top">
          <div className="Box">
            <img src={passwordImg} className="idImg" />
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
            <img src={passwordImg} className="idImg" />
            <input
              type="password"
              placeholder="비밀번호 확인"
              className="edit_pwcheck_input"
              onChange={(e) => {
                setCheckPw(e.target.value);
              }}
            />
          </div>
        </div>
        {/* ----- 중복 확인 멘트 ------ */}

        {checkPwMessage && (
          <div
            className={`signup_check_pw ${!passwordPlag ? "error-text" : ""}`}
          >
            {checkPwMessage}
          </div>
        )}
        {nickNameMessage && (
          <div
            className={`signup_check_nickname ${
              !isNickNameAvailable ? "error-text" : ""
            }`}
          >
            {nickNameMessage}
          </div>
        )}

        <div className="edit_bottom">
          <div className="Box">
            <img src={IdImg} className="idImg" />
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="Box">
            <img src={IdImg} className="idImg" />
            <input
              type="text"
              value={nickName}
              className="edit_nickName_input"
              onChange={(e) => {
                setNickName(e.target.value);
              }}
            />
          </div>
          <div className="Box">
            <img src={BirthImg} className="idImg" />
            <input
              type="date"
              value={birth}
              onChange={(e) => {
                setBirth(e.target.value);
              }}
              max={formattedToday}
            />
          </div>
          <div className="Box">
            <img src={PhoneImg} className="idImg" />
            <input type="text" value={telNum} onChange={handleChange} />
          </div>
        </div>
        <br></br>
        <div className="edit_check_box">{telMessage}</div>

        <button className="register_button" onClick={editButton}>
          수정하기
        </button>
      </form>
    </div>
  );
};

export default MyPageEdit;
