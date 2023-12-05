import "../../styles/myPage/myPage.scss";
import axios from "axios";
import { useEffect, userId, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useSelectedButton } from "../SelectedButtonContext";

const MyPage = () => {
  const { selectedButton, setSelectedButton } = useSelectedButton();

  const userId = useSelector((state) => state.user);
  console.log("userId", userId);
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [birth, setBirth] = useState("");
  const [telNum, setTelNum] = useState("");
  const [userImg, setUserImg] = useState("");
  const [boardsCount, setBoardsCount] = useState("0");
  const [likesCount, setLikesCount] = useState("0");
  const [plantsCount, setPlantsCount] = useState("0");
  const plantsCountButtonRef = useRef(null);
  const boardsCountButtonRef = useRef(null);
  const likesCountButtonRef = useRef(null);

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
        setBirth(myInfos.data.birth || "생일정보가 없습니다."); //null인 경우 방지
        setTelNum(myInfos.data.telNum || "전화번호 정보가 없습니다."); //null인 경우 방지
        setUserImg(cleanedUrl || ""); //null인 경우 방지
      } catch (error) {
        console.log("error", error);
      }
    };
    myInfo();
  }, [userId]);

  useEffect(() => {
    const myBoard = async () => {
      try {
        const myBoards = await axios.post(
          "http://localhost:8000/board/myBoards",
          {
            userId: userId,
          }
        );
        console.log("myBoards", myBoards.data.length);
        setBoardsCount(myBoards.data.length);
      } catch (error) {
        console.log("에러발생", error);
      }
    };
    myBoard();
  }, [userId]);

  useEffect(() => {
    const myLike = async () => {
      try {
        const myLikes = await axios.post(
          "http://localhost:8000/board/myBoards/findMyLike",
          {
            userId: userId,
          }
        );

        setLikesCount(myLikes.data.length);
      } catch (error) {
        console.log("error", error);
      }
    };
    myLike();
  }, [userId]);

  useEffect(() => {
    const myPlant = async () => {
      try {
        const myPlants = await axios.post(
          "http://localhost:8000/board/myBoards/findMyPlant",
          {
            userId: userId,
          }
        );
        setPlantsCount(myPlants.data.length);
      } catch (error) {
        console.log("error", error);
      }
    };
    myPlant();
  }, [userId]);

  const navigate = useNavigate();
  const boardsCountButton = async () => {
    sessionStorage.setItem("selectedTab", "my-boards"); //내 게시글 선택한 채로 이동
    await navigate("/myBoards");
    setSelectedButton("my");
  };

  const likesCountButton = async () => {
    sessionStorage.setItem("selectedTab", "like-boards");
    await navigate("/myBoards");
    setSelectedButton("my");
  };

  const plantsCountButton = async () => {
    sessionStorage.setItem("selectedTab", "my-plants");
    await navigate("/myPlants");
    setSelectedButton("my");
  };

  const editButton = async () => {
    await navigate("/mypageEdit");
    setSelectedButton("my");
  };

  const myPlantsTextClick = () => {
    if (plantsCountButtonRef.current) {
      plantsCountButtonRef.current.click();
    }
  };
  const myBoardsTextClick = () => {
    if (boardsCountButtonRef.current) {
      boardsCountButtonRef.current.click();
    }
  };

  const myLikesTextClick = () => {
    if (likesCountButtonRef.current) {
      likesCountButtonRef.current.click();
    }
  };

  return (
    <div className="myPage-main-container">
      <div className="Title">마이페이지</div>
      <div className="myInfo">
        <div className="myInfoTop">
          <div className="nameInfo">
            <span className="nameSpan">{name} </span>님의 정보
          </div>
          <button className="editButton" onClick={editButton}>
            수정
          </button>
        </div>
        <div className="myInfoBottom">
          <img className="userImg" alt="프로필 이미지" src={userImg}></img>
          <div className="myInfoRight">
            <div className="nickName">닉네임: {nickName}</div>
            <div className="birth">생년월일: {birth}</div>
            <div className="telNum">전화번호: {telNum}</div>
          </div>
        </div>
      </div>
      <div className="myInfoBoards">
        <div className="myPlants" onClick={myPlantsTextClick}>
          <div className="myPlantsText">내 작물</div>
          <button
            ref={plantsCountButtonRef}
            className="plantsCount"
            type="button"
            onClick={plantsCountButton}
          >
            {plantsCount}
          </button>
        </div>
        <div className="myBoards" onClick={myBoardsTextClick}>
          <div className="myBoardsText">게시글</div>
          <button
            ref={boardsCountButtonRef}
            className="boardsCount"
            type="button"
            onClick={boardsCountButton}
          >
            {boardsCount}
          </button>
        </div>
        <div className="myLikes" onClick={myLikesTextClick}>
          <div className="myLikesText">좋아요</div>
          <button
            ref={likesCountButtonRef}
            className="likesCount"
            type="button"
            onClick={likesCountButton}
          >
            {likesCount}
          </button>
        </div>
      </div>
    </div>
  );
};
export default MyPage;
