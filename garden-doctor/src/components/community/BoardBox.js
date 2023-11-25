import React from "react";
import "../../styles/board.scss";
import { useSelector } from "react-redux";
import redLike from "../../images/redLike.png";
import likeIcon from "../../images/likeIcon.png";
import commentIcon from "../../images/commentIcon.png";

const BoardBox = ({
  imgSrc,
  title,
  text,
  userId,
  userImg,
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

  const reduxUserId = useSelector((state) => state.user);

  // 좋아요를 눌렀는지 여부를 확인하는 함수
  const isLikedByUser =
    likeData && likeData.some((like) => like.userId === reduxUserId);

  const clickedBoard = (e) => {
    navigate(`/boardDetail/${userId}/${boardId}`);
  };

  return (
    <div className="board-container" onClick={(e) => clickedBoard(e)}>
      <img className="boardBox-userImg" alt="userImg" src={userImg}></img>
      <span className="boardBox-userName">{userId}</span>
      <span className="boardBox-Dday">{formattedDate}</span> <br></br>
      <span className="boardBox-boardTitle">{title}</span>
      <br></br>
      <img
        className="boardBox-likeButton"
        alt="좋아요"
        src={isLikedByUser ? redLike : likeIcon}
      />
      {likeData ? (
        <span className="boardBox-likeNum">{likeData.length}</span>
      ) : (
        <span className="boardBox-likeNum">0</span>
      )}
      <img className="boardBox-commentButton" alt="댓글" src={commentIcon} />
      {commentData ? (
        commentData.map((comment) => (
          <span className="boardBox-commentNum">{commentData.length}</span>
        ))
      ) : (
        <span className="boardBox-commentNum">0</span>
      )}
      <img className="boardBox-BoardImg" alt="BoardImg" src={imgSrc[0]}></img>
    </div>
  );
};

export default BoardBox;
