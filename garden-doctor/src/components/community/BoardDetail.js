import React, { useEffect, useRef, useState } from "react";
import "../../styles/boardDetail.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import likeIcon from "../../images/likeIcon.png";
import sendImage from "../../images/send-image.png";
import redLike from "../../images/redLike.png";
import rightArrow from "../../images/rightArrow.png";
import leftArrow from "../../images/leftArrow.png";
import Heart from "react-animated-heart";

const BoardDetail = () => {
  const { userId, boardId } = useParams();
  const [nickname, setNickname] = useState();
  const [userData, setUserData] = useState(null);
  const [boardData, setBoardData] = useState(null);
  const [likeData, setLikeData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const [loading, setLoading] = useState(true); // 추가: 로딩 상태 관리
  const [commentInputs, setCommentInputs] = useState(); // 배열로 변경
  const [isLiked, setIsLiked] = useState(false); // 좋아요 토글 상태 추가
  const [likeImage, setLikeImage] = useState(likeIcon);
  const [scrollBottom, setScrollBottom] = useState(true);
  const commentsDivRef = useRef();
  const navigate = useNavigate();
  const reduxUserId = useSelector((state) => state.user);
  const reduxUserNickname = useSelector((state) => state.nickname);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isClick, setClick] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const [boardResponse, likeResponse, commentResponse, userResponse] =
          await Promise.all([
            axios.get(`http://localhost:8000/board/getBoard/${boardId}`),
            axios.get(`http://localhost:8000/board/getLike/${boardId}`),
            axios.get(`http://localhost:8000/board/getComment/${boardId}`),
            axios.post("http://localhost:8000/sign/myInfo", {
              userId,
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

        setNickname(userResponse.data.nickName);
        setBoardData(boardResponse.data);
        setLikeData(likeResponse.data);
        setCommentData(commentResponse.data);
        setUserData(cleanedUrl);

        // 클라이언트의 userId가 이미 좋아요를 눌렀는지 여부 확인
        const isLikedByUser = likeResponse.data.some(
          (like) => like.userId == reduxUserId
        );
        setClick(isLikedByUser ? true : false);
        setIsLiked(isLikedByUser);
        setLikeImage(isLikedByUser ? redLike : likeIcon);

        setLoading(false); // 추가: 데이터 로딩 완료 후 로딩 상태 변경
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // 추가: 에러 발생 시에도 로딩 상태 변경
      }
    };

    fetchData();
  }, [boardId, reduxUserId, isLiked, userId]);

  useEffect(() => {
    if (commentsDivRef.current) {
      // commentsDivRef.current이 정의되어 있는지 확인
      commentsDivRef.current.scrollTop = commentsDivRef.current.scrollHeight;
      setScrollBottom(false);
    }
  }, [commentData, scrollBottom]);

  if (loading) {
    // 추가: 로딩 중일 때 로딩 화면을 보여줍니다.
    return <div>Loading...</div>;
  }

  const showEditDeleteButtons = userId == reduxUserId;

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

  const postCommentButton = (e) => {
    if (!reduxUserId) {
      alert("로그인 해주세요");
      navigate("/login");
      return;
    }

    if (commentInputs === "") return;

    let commentText = commentInputs; // commentInput 값을 임시 변수에 저장
    setCommentInputs(""); // 새로운 상태로 업데이트

    const postComment = async () => {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/board/postComment",
        data: {
          commentText,
          userId: reduxUserId,
          boardId,
          nickName: reduxUserNickname,
        },
      });
      return res;
    };
    postComment().then((res) => {
      const newComment = res.data; // 서버가 새 댓글을 포함한 데이터로 응답한다고 가정합니다.
      setCommentData((prevComments) => [...prevComments, newComment]);
      setScrollBottom(true);
    });
  };

  const likeButtonClick = async () => {
    if (!reduxUserId) {
      alert("로그인 해주세요");
      navigate("/login");
      return;
    }

    try {
      if (isLiked) {
        await axios.delete(
          `http://localhost:8000/board/deleteLike/${boardId}`,
          { data: { userId: reduxUserId } }
        );
        setIsLiked(false);
        setClick(false);
        setLikeImage(likeIcon);
      } else {
        await axios.post(`http://localhost:8000/board/postLike/${boardId}`, {
          userId: reduxUserId,
        });
        setIsLiked(true);
        setClick(false);
        setLikeImage(redLike);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? boardData.img.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === boardData.img.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      postCommentButton(e);
    }
  };

  return (
    <div className="main-container">
      <div className="large-container">
        <div className="BoardDetail-container">
          <img className="BoardDetail-userImg" src={userData} alt="프로필" />
          <span className="BoardDetail-userName">{nickname}</span>
          {showEditDeleteButtons && (
            <>
              <button className="BoardDetail-editButton" onClick={handleEdit}>
                수정
              </button>
              <button
                className="BoardDetail-deleteButton"
                onClick={handleDelete}
              >
                삭제
              </button>
            </>
          )}
          {boardData.img.length > 1 && (
            <>
              <button
                className="BoardDetail-prevButton"
                onClick={handlePrevImage}
              >
                <img src={leftArrow} alt="previmg" />
              </button>
              <button
                className="BoardDetail-nextButton"
                onClick={handleNextImage}
              >
                <img src={rightArrow} alt="nextimg" />
              </button>
            </>
          )}
          <div className="BoardDetail-boardImgContainer">
            <img
              className="BoardDetail-boardImg"
              src={boardData.img[currentImageIndex]}
              alt="BoardImage"
            />
          </div>
          <Heart
            className="BoardDetail-likeImg"
            alt="좋아요"
            isClick={isClick}
            src={likeImage}
            onClick={likeButtonClick}
          />
          <span className="BoardDetail-likeNum">{likeData.length}</span>
          <span className="BoardDetail-boardText">
            {boardData.text.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </span>
          <span className="BoardDetail-commentNum">
            댓글 {commentData.length}
          </span>
          <div className="BoardDetail-comments" ref={commentsDivRef}>
            {/* Map over commentData and render each comment */}
            {commentData.map((comment, index) => (
              <p key={index}>
                {/* Assuming you have an image for comments, adjust the path accordingly */}
                <span className="BoardDetail-commentUserName">
                  {comment.nickName}:{" "}
                </span>
                <span>{comment.commentText}</span>
              </p>
            ))}
          </div>
          <div className="BoardDetail-commentInput">
            <input
              type="text"
              placeholder="댓글 작성"
              value={commentInputs}
              onChange={(e) => {
                const newCommentInput = e.target.value; // 단일 문자열로 변경
                setCommentInputs(newCommentInput);
              }}
              onKeyDown={handleEnterKey}
            />
            <button onClick={(e) => postCommentButton(e)} value={boardId}>
              <img src={sendImage} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
