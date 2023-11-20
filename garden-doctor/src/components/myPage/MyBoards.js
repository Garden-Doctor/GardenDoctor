import React, { useEffect, useState } from "react";
import BoardBox from "../community/BoardBox";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyBoards = () => {
  const userId = useSelector((state) => state.user);
  const [boards, setBoards] = useState([]);
  const [commentData, setCommentData] = useState(null);
  const [likeData, setLikeData] = useState(null);
  const [showMyboards, setShowMyBoards] = useState(false);
  const [likeBoards, setLikeBoards] = useState(false);

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

  const navigate = useNavigate();

  const myBoardsClick = () => {
    setShowMyBoards(true);
  };
  const likeBoardsClick = () => {
    setLikeBoards(true);
    setShowMyBoards(false);
  };
  return (
    <div className="myBoard-main-container">
      <button className="myBoardsButton" onClick={myBoardsClick}>
        내 게시글
      </button>
      <button className="likeBoardsButton" onClick={likeBoardsClick}>
        좋아요한 게시글
      </button>
      {showMyboards &&
        boards.map((item, index) => (
          <BoardBox
            key={item.boardId}
            imgSrc={item.img}
            text={item.text}
            userId={item.userId}
            boardId={item.boardId}
            likeData={likeData && likeData[item.boardId]}
            commentData={commentData && commentData[item.boardId]}
            day={item.createdAt}
            navigate={navigate}
          />
        ))}
    </div>
  );
};
export default MyBoards;
