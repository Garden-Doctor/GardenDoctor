import React, { useEffect, useState } from "react";
import BoardBox from "../community/BoardBox";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyBoards = () => {
  const userId = useSelector((state) => state.user);
  const [boards, setBoards] = useState([]);
  const [commentInputs, setCommentInputs] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const [likeData, setLikeData] = useState(null);

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
        setCommentInputs(new Array(sortedBoards.length).fill(""));

        //boardId를 가지고 그에 해당하는 댓글 및 좋아요 수 가져오기
        const groupedCommentData = groupCommentsByBoardId(commentRes.data);
        setCommentData(groupedCommentData);

        const groupedLikeData = groupLikesByBoardId(likeRes.data);
        setLikeData(groupedLikeData);
      } catch (error) {
        console.log("error", error);
      }
    };
    myboards();
  }, [userId]); //useEffect의 의존성 배열을 추가하여 userId가 변경될때마다 useEffect가 실행되게 함.
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
  const navigate = useNavigate();

  const postCommentButton = async (e, index) => {
    try {
      const commentText = commentInputs[index];
      const data = {
        commentText,
        userId: userId,
        boardId: e.target.value,
        commentId: commentData[e.target.value]
          ? commentData[e.target.value].length + 1
          : 1,
      };

      const updatedCommentData = { ...commentData };
      if (updatedCommentData[e.target.value]) {
        updatedCommentData[e.target.value].push(data);
      } else {
        updatedCommentData[e.target.value] = [data];
      }
      setCommentData(updatedCommentData);
      setCommentInputs((prevInputs) =>
        prevInputs.map((input, i) => (i === index ? "" : input))
      );
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };
  return (
    <div className="myBoard-main-container">
      {boards.map((item, index) => (
        <BoardBox
          key={item.boardId}
          imgSrc={item.img}
          text={item.text}
          userId={item.userId}
          boardId={item.boardId}
          likeData={likeData && likeData[item.boardId]}
          commentData={commentData && commentData[item.boardId]}
          day={item.createdAt}
          commentInput={commentInputs[index]}
          onPostComment={(e) => postCommentButton(e, index)}
          navigate={navigate}
        />
      ))}
    </div>
  );
};
export default MyBoards;
