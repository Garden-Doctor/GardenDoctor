import React, { useEffect, useState } from "react";
import axios from "axios"; // BoardBox 컴포넌트의 경로에 맞게 수정
import BoardBox from "../community/BoardBox";

const TodayBoard = () => {
  const [mostLikedBoards, setMostLikedBoards] = useState([]);

  useEffect(() => {
    const fetchMostLikedBoards = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000//board/getMostLikedBoards"
        );
        console.log(response.data);
        setMostLikedBoards(response.data);
      } catch (error) {
        console.error("Error fetching most liked boards:", error);
      }
    };

    fetchMostLikedBoards();
  }, []);

  return (
    <div className="todayboard-container">
      TodayBoard
      <div className="large-container">
        {mostLikedBoards.map((item) => (
          <BoardBox
            key={item.boardId}
            // 여기에서 필요한 데이터를 전달합니다.
            boardId={item.boardId}
            // ...
          />
        ))}
      </div>
    </div>
  );
};

export default TodayBoard;
