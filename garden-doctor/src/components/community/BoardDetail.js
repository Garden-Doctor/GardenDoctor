import React from "react";
import "../../sytles/boardDetail.scss";

const BoardDetail = () => {
  return (
    <div>
      <div className="BoardDetail-container">
        <img
          className="BoardDetail-userImg"
          src="imgs/profile.png"
          alt="프로필"
        />
        <span className="BoardDetail-userName">이름</span>
        <button className="BoardDetail-editButton">수정</button>
        <button className="BoardDetail-deleteButton">삭제</button>
        <img
          className="BoardDetail-boardImg"
          src="https://img.freepik.com/free-photo/many-ripe-juicy-red-apples-covered-with-water-drops-closeup-selective-focus-ripe-fruits-as-a-background_166373-2611.jpg"
          alt="BoardImage"
        />
        <img
          className="BoardDetail-likeImg"
          src="imgs/likeIcon.png"
          alt="좋아요"
        />
        <span className="BoardDetail-likeNum">30</span>
        <span className="BoardDetail-boardText">게시글 내용들......</span>
        <span className="BoardDetail-commentNum">댓글 수</span>
        <div className="BoardDetail-comments">
          <p>
            <img
              className="BoardDetail-commentImg"
              src="imgs/likeIcon.png"
              alt=""
            />
            <span>댓글1</span>
          </p>
          <p>
            <img
              className="BoardDetail-commentImg"
              src="imgs/profile.png"
              alt=""
            />
            <span>댓글2</span>
          </p>
          <p>
            <img
              className="BoardDetail-commentImg"
              src="imgs/likeIcon.png"
              alt=""
            />
            <span>댓글2</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
