import React, { useEffect, useState } from "react";
import axios from "axios"; // BoardBox 컴포넌트의 경로에 맞게 수정
import BoardBox from "../community/BoardBox";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import likeIcon from "../../images/likeIcon.png";
import redLike from "../../images/redLike.png";

const TodayBoard = () => {
  const [mostLikedBoards, setMostLikedBoards] = useState([]);
  const [userData, setUserData] = useState(null);
  const [boardData, setBoardData] = useState(null);
  const [nickname, setNickname] = useState();
  const [commentData, setCommentData] = useState(null);
  const [likeData, setLikeData] = useState(null);
  const [loading, setLoading] = useState(true); // 추가: 로딩 상태 관리
  const reduxUserId = useSelector((state) => state.user);
  const [isLiked, setIsLiked] = useState(false); // 좋아요 토글 상태 추가
  const [likeImage, setLikeImage] = useState(likeIcon);

  useEffect(() => {
    const fetchMostLikedBoards = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/board/getMostLikedBoards`
        );
        console.log(response.data);
        setMostLikedBoards(response.data);
        const mostLikedBoardId = response.data.boardId;

        console.log("Fetching data...");
        const [boardResponse, likeResponse, commentResponse, userResponse] =
          await Promise.all([
            axios.get(
              `${process.env.REACT_APP_SERVER_URL}/board/getBoard/${mostLikedBoardId}`
            ),
            axios.get(
              `${process.env.REACT_APP_SERVER_URL}/board/getLike/${mostLikedBoardId}`
            ),
            axios.get(
              `${process.env.REACT_APP_SERVER_URL}/board/getComment/${mostLikedBoardId}`
            ),
            axios.post(`${process.env.REACT_APP_SERVER_URL}/sign/myInfo`, {
              userId: response.data.userId,
            }),
          ]);

        console.log(
          "Data fetched:",
          boardResponse,
          likeResponse,
          commentResponse,
          userResponse
        );

        const url = userResponse.data.userImg;
        let cleanedUrl = url?.replace(/^"(.*)"$/, "$1");
        console.log(cleanedUrl);

        setBoardData(boardResponse.data);
        setLikeData(likeResponse.data);
        setCommentData(commentResponse.data);
        setUserData(cleanedUrl);
        setNickname(userResponse.data.nickName);

        // 클라이언트의 userId가 이미 좋아요를 눌렀는지 여부 확인
        const isLikedByUser = likeResponse.data.some(
          (like) => like.userId === reduxUserId
        );
        setIsLiked(isLikedByUser);
        setLikeImage(isLikedByUser ? redLike : likeIcon);

        setLoading(false); // 추가: 데이터 로딩 완료 후 로딩 상태 변경
      } catch (error) {
        console.error("Error fetching most liked boards:", error);
      }
    };

    fetchMostLikedBoards();
  }, [reduxUserId]);

  const navigate = useNavigate();

  if (loading) {
    // 추가: 로딩 중일 때 로딩 화면을 보여줍니다.
    return (
      <div className="todayboard-unvisible">
        <div className="todayboard-unvisible-box"></div>
        로딩중이거나 좋아요한 게시글이 없습니다.
      </div>
    );
  }

  return (
    <div className="todayboard-container">
      {mostLikedBoards ? (
        <>
          <span>오늘의 게시물</span>
          <BoardBox
            key={mostLikedBoards.boardId}
            imgSrc={mostLikedBoards.img}
            title={mostLikedBoards.title}
            userId={mostLikedBoards.userId}
            nickname={nickname}
            userImg={userData}
            boardId={mostLikedBoards.boardId}
            likeData={likeData}
            commentData={commentData}
            day={mostLikedBoards.createdAt}
            navigate={navigate}
          />
        </>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default TodayBoard;
