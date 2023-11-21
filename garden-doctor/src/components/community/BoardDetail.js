import React, { useEffect, useState } from "react";
import "../../styles/boardDetail.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import likeIcon from "../../images/likeIcon.png";
import profileExample from "../../images/profile.png";

const BoardDetail = () => {
  const { userId, boardId } = useParams();
  const [boardData, setBoardData] = useState(null);
  const [likeData, setLikeData] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const [loading, setLoading] = useState(true); // 추가: 로딩 상태 관리
  const navigate = useNavigate();
  const reduxUserId = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const [boardResponse, likeResponse, commentResponse] =
          await Promise.all([
            axios.get(`http://localhost:8000/board/getBoard/${boardId}`),
            axios.get(`http://localhost:8000/board/getLike/${boardId}`),
            axios.get(`http://localhost:8000/board/getComment/${boardId}`),
          ]);

        console.log(
          "Data fetched:",
          boardResponse,
          likeResponse,
          commentResponse
        );

        setBoardData(boardResponse.data);
        setLikeData(likeResponse.data);
        setCommentData(commentResponse.data);
        setLoading(false); // 추가: 데이터 로딩 완료 후 로딩 상태 변경
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // 추가: 에러 발생 시에도 로딩 상태 변경
      }
    };

    fetchData();
  }, [boardId]);

  if (loading) {
    // 추가: 로딩 중일 때 로딩 화면을 보여줍니다.
    return <div>Loading...</div>;
  }

  const showEditDeleteButtons = userId === reduxUserId;

  const handleDelete = () => {
    // Confirm delete using the browser's built-in confirmation dialog
    const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?");
    if (confirmDelete) {
      // If the user confirms, send a request to delete the board
      axios
        .delete(`http://localhost:8000/board/deleteBoard/${boardId}`)
        .then(() => {
          // After successful deletion, navigate back to the board list
          alert("게시글이 삭제되었습니다.");
          navigate("/board");
        })
        .catch((error) => {
          console.error("Error deleting board:", error);
        });
    }
  };

  const handleEdit = () => {
    navigate(`/editboard/${userId}/${boardId}`);
  };

  return (
    <div>
      <div className="BoardDetail-container">
        <img
          className="BoardDetail-userImg"
          src={profileExample}
          alt="프로필"
        />
        <span className="BoardDetail-userName">{boardData.userId}</span>
        {showEditDeleteButtons && (
          <>
            <button className="BoardDetail-editButton" onClick={handleEdit}>
              수정
            </button>
            <button className="BoardDetail-deleteButton" onClick={handleDelete}>
              삭제
            </button>
          </>
        )}
        <img
          className="BoardDetail-boardImg"
          src={boardData.img}
          alt="BoardImage"
        />
        <img className="BoardDetail-likeImg" alt="좋아요" src={likeIcon} />
        <span className="BoardDetail-likeNum">{likeData.length}</span>
        <span className="BoardDetail-boardText">{boardData.text}</span>
        <span className="BoardDetail-commentNum">
          댓글 {commentData.length}
        </span>
        <div className="BoardDetail-comments">
          {/* Map over commentData and render each comment */}
          {commentData.map((comment, index) => (
            <p key={index}>
              {/* Assuming you have an image for comments, adjust the path accordingly */}
              <span className="BoardDetail-commentUserName">
                {comment.userId}:{" "}
              </span>
              <span>{comment.commentText}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
