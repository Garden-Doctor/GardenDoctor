import React from "react";
import "../../styles/board.scss";

const BoardBox = ({
  imgSrc,
  text,
  userId,
  boardId,
  likeData,
  commentData,
  day,
  navigate,
}) => {
  const formatDate = (dateString) => {
    const currentDate = new Date();
    const postDate = new Date(dateString);
    const timeDiff = currentDate - postDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) {
      return "오늘";
    } else if (daysDiff === 1) {
      return "어제";
    } else {
      return `${daysDiff}일 전`;
    }
  };

  const formattedDate = formatDate(day);

  const clickedBoard = (e) => {
    navigate(`/boardDetail/${userId}/${boardId}`);
  };

  return (
    <div className="board-container" onClick={(e) => clickedBoard(e)}>
      <img
        className="boardBox-userImg"
        alt="userImg"
        src="https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg"
      ></img>
      <span className="boardBox-userName">{userId}</span>
      <span className="boardBox-Dday">{formattedDate}</span> <br></br>
      <span className="boardBox-boardTitle">{text}</span>
      <br></br>
      <img
        className="boardBox-likeButton"
        alt="좋아요"
        src="imgs/likeIcon.png"
      />
      {likeData ? (
        <span className="boardBox-likeNum">{likeData.length}</span>
      ) : (
        <span className="boardBox-likeNum">0</span>
      )}
      <img
        className="boardBox-commentButton"
        alt="댓글"
        src="imgs/commentIcon.png"
      />
      {commentData ? (
        commentData.map((comment) => (
          <span className="boardBox-commentNum">{commentData.length}</span>
        ))
      ) : (
        <span className="boardBox-commentNum">0</span>
      )}
      <img className="boardBox-BoardImg" alt="BoardImg" src={imgSrc}></img>
    </div>
  );
};

export default BoardBox;
