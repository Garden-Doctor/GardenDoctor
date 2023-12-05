import React, { useEffect, useId, useState } from "react";
import BoardBox from "../community/BoardBox";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/myPage/myBoard.scss";

import { useSelectedButton } from "../SelectedButtonContext";

const MyBoards = () => {
  const { selectedButton, setSelectedButton } = useSelectedButton();

  const userId = useSelector((state) => state.user);
  const [boards, setBoards] = useState([]);
  const [commentData, setCommentData] = useState(null);
  const [likeData, setLikeData] = useState(null);
  const [showMyboards, setShowMyBoards] = useState(false);
  const [showlikeBoards, setShowLikeBoards] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    sessionStorage.getItem("selectedTab")
  );

  //내 게시글 불러오기
  useEffect(() => {
    const myboards = async () => {
      try {
        const [boardRes, commentRes, likeRes] = await Promise.all([
          axios.post(`http://localhost:8000/board/myBoards`, {
            userId: userId,
          }),
          axios.post("http://localhost:8000/board/myBoards/comment"),
          axios.post("http://localhost:8000/board/myBoards/like"),
        ]);
        for (const board of boardRes.data) {
          try {
            const userImgRes = await axios.post(
              "http://localhost:8000/sign/myInfo",
              {
                userId: board.userId,
              }
            );
            const url = userImgRes.data.userImg;
            const nickName = userImgRes.data.nickName;
            board.nickName = nickName;
            let cleanedUrl = url?.replace(/^"(.*)"$/, "$1");
            board.userImg = cleanedUrl;
          } catch (error) {
            console.log("error", error);
          }
        }
        const sortedBoards = boardRes.data.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });

        setBoards(sortedBoards);
        const groupedCommentData = groupCommentsByBoardId(commentRes.data);
        setCommentData(groupedCommentData);

        const groupedLikeData = groupLikesByBoardId(likeRes.data);
        setLikeData(groupedLikeData);
      } catch (error) {
        console.log("error", error);
      }
    };
    myboards();
  }, [userId, showMyboards]); //useEffect의 의존성 배열을 추가하여 userId가 변경될때마다 useEffect가 실행되게 함.
  const groupCommentsByBoardId = (comments) => {
    const groupedData = {};
    comments.forEach((comment) => {
      const boardId = comment.boardId;
      if (!groupedData[boardId]) {
        groupedData[boardId] = [];
      }
      groupedData[boardId].push(comment);
    });
    return groupedData;
  };

  const groupLikesByBoardId = (likes) => {
    const groupedData = {};
    likes.forEach((like) => {
      const boardId = like.boardId;
      if (!groupedData[boardId]) {
        groupedData[boardId] = [];
      }
      groupedData[boardId].push(like);
    });
    return groupedData;
  };

  //좋아요 게시글 찾기
  useEffect(() => {
    const likeboards = async () => {
      try {
        const [likeRes] = await Promise.all([
          axios.post(`http://localhost:8000/board/myBoards/findMyLike`, {
            userId: userId,
          }),
        ]);

        const boardIds = likeRes.data.map((board) => board.boardId);
        const updatedBoards = []; // 기존 게시글 상태 복사
        const updatedCommentData = { ...commentData }; // 기존 댓글 데이터 복사
        const updatedLikeData = { ...likeData }; // 기존 좋아요 데이터 복사
        console.log("boardIds", boardIds);
        console.log("updatedBoards", updatedBoards);

        for (const boardId of boardIds) {
          try {
            const [boardRes, commentRes] = await Promise.all([
              axios.post(
                "http://localhost:8000/board/myBoards/findMyLikeBoards",
                { boardId: boardId }
              ),
              axios.post("http://localhost:8000/board/myBoards/comment"),
            ]);
            console.log("boardRes", boardRes.data);
            // 중복 체크를 통해 중복된 데이터 제외하고 추가
            // const filteredBoards = boardRes.data.filter(
            //   (newBoard) =>
            //     !updatedBoards.some(
            //       (board) => board.boardId === newBoard.boardId
            //     )
            // );
            const { findMyLikeBoard, findNickName } = boardRes.data;
            console.log("findNickName", findNickName);
            const combinedData = {
              ...findMyLikeBoard,
              ...findNickName,
            };
            // updatedBoards.push(combinedData);
            const updatedBoardData = findMyLikeBoard.map((board, index) => {
              const nickname = findNickName[index]?.nickName || null;
              const userImg = findNickName[index]?.userImg || null;
              return {
                ...board,
                nickname,
                userImg,
              };
            });
            console.log("updatedBoards", updatedBoardData);
            updatedBoards.push(...updatedBoardData);
            const groupedCommentData = groupCommentsByBoardId(commentRes.data);
            Object.assign(updatedCommentData, groupedCommentData);

            const groupedLikeData = groupLikesByBoardId(likeRes.data);
            Object.assign(updatedLikeData, groupedLikeData);
            setBoards(updatedBoards);
          } catch (error) {
            console.log("error", error);
          }
        }

        // 상태 업데이트
        setBoards(updatedBoards);
        setCommentData(updatedCommentData);
        setLikeData(updatedLikeData);
      } catch (error) {
        console.log("error", error);
      }
    };

    if (showlikeBoards) {
      likeboards();
    }
  }, [userId, showlikeBoards]);

  useEffect(() => {
    if (selectedTab === "my-boards") {
      setShowMyBoards(true);
      setShowLikeBoards(false);
    } else if (selectedTab === "like-boards") {
      setShowLikeBoards(true);
      setShowMyBoards(false);
    }
  }, [selectedTab]);

  const myBoardsClick = () => {
    setShowMyBoards(true);
    setShowLikeBoards(false);
    sessionStorage.setItem("selectedTab", "my-boards");
    setSelectedTab("my-boards");
  };

  const likeBoardsClick = () => {
    setShowLikeBoards(true);
    setShowMyBoards(false);
    sessionStorage.setItem("selectedTab", "like-boards");
    setSelectedTab("like-boards");
  };

  const navigate = useNavigate();

  return (
    <div className="myBoard-main-container">
      <div className="buttons">
        <button
          className={`myBoardsButton ${
            selectedTab === "my-boards" ? "selected" : ""
          }`}
          onClick={myBoardsClick}
        >
          내 게시글
        </button>
        <button
          className={`likeBoardsButton ${
            selectedTab === "like-boards" ? "selected" : ""
          }`}
          onClick={likeBoardsClick}
        >
          좋아요한 게시글
        </button>
      </div>
      {showMyboards &&
        boards.map((item, index) => {
          console.log(`BoardBox for 'My Boards' - Item content:`, item); // Item 내용 확인
          return (
            <BoardBox
              key={item.boardId}
              imgSrc={item.img}
              title={item.title}
              text={item.text}
              userId={item.userId}
              userImg={item.userImg}
              nickname={item.nickName}
              boardId={item.boardId}
              likeData={likeData && likeData[item.boardId]}
              commentData={commentData && commentData[item.boardId]}
              day={item.createdAt}
              navigate={navigate}
            />
          );
        })}
      {showlikeBoards &&
        boards.map((item, index) => {
          console.log(`BoardBox for Liked Boards`, item); // Item 내용 확인
          return (
            <BoardBox
              key={item.boardId}
              imgSrc={item.img}
              title={item.title}
              text={item.text}
              userId={item.userId}
              userImg={item.userImg}
              nickname={item.nickname}
              boardId={item.boardId}
              likeData={likeData && likeData[item.boardId]}
              commentData={commentData && commentData[item.boardId]}
              day={item.createdAt}
              navigate={navigate}
            />
          );
        })}
    </div>
  );
};
export default MyBoards;
