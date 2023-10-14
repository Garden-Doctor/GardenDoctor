import React from "react";
import { useNavigate } from "react-router-dom";

const Board = () => {
  const navigate = useNavigate();

  const writeButton = () => {
    navigate("/writeBoard");
  };

  return (
    <div>
      <h1>Board</h1>
      <button onClick={writeButton}>글쓰기</button>
      <div
        style={{
          border: "1px solid black",
          width: "350px",
          textAlign: "center",
        }}
      >
        <img style={{ width: "300px", height: "300px" }} src="" alt="" />
        <p>
          <button>좋아요</button> 좋아요 개수 ~개
        </p>
        <p>게시글 설명</p>
        <a href="">댓글보기</a>
      </div>
    </div>
  );
};

export default Board;
