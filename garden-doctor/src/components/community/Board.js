import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import BoardBox from "./BoardBox";
import BoardWrite from "../../images/boardWrite.png";

const Board = () => {
  const [loading, setLoading] = useState(true);
  const [boards, setBoards] = useState([]);
  const [commentInputs, setCommentInputs] = useState([]);
  const [commentData, setCommentData] = useState(null);
  const [likeData, setLikeData] = useState(null);
  const username = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [boardRes, commentRes, likeRes] = await Promise.all([
          axios.get("http://localhost:8000/board/getBoards"),
          axios.get("http://localhost:8000/board/getComments"),
          axios.get("http://localhost:8000/board/getLikes"),
        ]);

        const sortedBoards = boardRes.data.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });

        const boardsWithUserImg = [];

        for (const board of sortedBoards) {
          // Fetch userImg for each userId
          const userImgRes = await axios.post(
            "http://localhost:8000/sign/myInfo",
            {
              userId: board.userId,
            }
          );

          const url = userImgRes.data.userImg;
          let cleanedUrl = url?.replace(/^"(.*)"$/, "$1");
          console.log(cleanedUrl);

          const boardWithUserImg = {
            ...board,
            userImg: cleanedUrl, // Replace with the actual field name from your API
          };

          boardsWithUserImg.push(boardWithUserImg);
        }

        setBoards(boardsWithUserImg);
        console.log(boards);

        setCommentInputs(new Array(sortedBoards.length).fill(""));

        const groupedCommentData = groupCommentsByBoardId(commentRes.data);
        setCommentData(groupedCommentData);

        const groupedLikeData = groupLikesByBoardId(likeRes.data);
        setLikeData(groupedLikeData);

        setLoading(false);

        console.log("userReduxName: " + username);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const writeButton = () => {
    if (!username) {
      alert("로그인 해주세요.");
      navigate("/login");
    } else {
      navigate("/writeBoard");
    }
  };

  const postCommentButton = async (e, index) => {
    try {
      const commentText = commentInputs[index];

      const postCommentRes = await axios.post(
        "http://localhost:8000/board/postComment",
        {
          commentText,
          userId: username,
          boardId: e.target.value,
        }
      );

      const data = {
        commentText,
        userId: username,
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
    <div className="">
      <img
        className="boardWriteButton"
        src={BoardWrite}
        alt=""
        onClick={writeButton}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="large-container">
          <img
            className="boardWriteButton"
            src={BoardWrite}
            alt=""
            onClick={writeButton}
          />
          {boards.map((item, index) => (
            <BoardBox
              key={item.boardId}
              imgSrc={item.img}
              text={item.text}
              title={item.title}
              userId={item.userId}
              userImg={item.userImg}
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
      )}
    </div>
  );
};

export default Board;
//////
//////
//////
//////
//////////////최신순으로 정렬 이전 코드 게시 상세글 짤 때 참고 필요////////////////
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import BoardBox from "./BoardBox";

// const Board = () => {
//   const [loading, setLoading] = useState(true);
//   const [boards, setBoards] = useState([]);
//   const [commentInputs, setCommentInputs] = useState([]); // 배열로 변경
//   const [commentData, setCommentData] = useState(null);
//   const [likeData, setLikeData] = useState(null);
//   const username = useSelector((state) => state.user);

//   useEffect(() => {
//     const getBoard = async () => {
//       const res = await axios({
//         method: "GET",
//         url: "http://localhost:8000/board/getBoards",
//       });
//       console.log(res.data);
//       setBoards(res.data);
//       setCommentInputs(new Array(res.data.length).fill(""));
//     };
//     const getComments = async () => {
//       const res = await axios({
//         method: "GET",
//         url: "http://localhost:8000/board/getComments",
//       });
//       const groupedData = groupCommentsByBoardId(res.data);
//       console.log(groupedData);
//       setCommentData(groupedData); // 그룹화된 데이터를 상태에 저장
//     };
//     const getLikes = async () => {
//       const res = await axios({
//         method: "GET",
//         url: "http://localhost:8000/board/getLikes",
//       });
//       const groupedData = groupLikesByBoardId(res.data);
//       setLikeData(groupedData); // 그룹화된 데이터를 상태에 저장
//       console.log(res.data, groupedData, commentData);
//     };
//     getBoard().then(() => {
//       getComments().then(() => getLikes().then(() => setLoading(false)));
//     });
//   }, []);

//   // boardId를 기준으로 댓글 데이터를 그룹화하는 함수
//   const groupCommentsByBoardId = (comments) => {
//     const groupedData = {};
//     comments.forEach((comment) => {
//       const boardId = comment.boardId;
//       if (!groupedData[boardId]) {
//         groupedData[boardId] = [];
//       }
//       groupedData[boardId].push(comment);
//     });
//     return groupedData;
//   };
//   // boardId를 기준으로 좋아요 데이터를 그룹화하는 함수
//   const groupLikesByBoardId = (likes) => {
//     const groupedData = {};
//     likes.forEach((like) => {
//       const boardId = like.boardId;
//       if (!groupedData[boardId]) {
//         groupedData[boardId] = [];
//       }
//       groupedData[boardId].push(like);
//     });
//     return groupedData;
//   };

//   const navigate = useNavigate();

//   const writeButton = () => {
//     navigate("/writeBoard");
//   };

//   const postCommentButton = (e, index) => {
//     const commentText = commentInputs[index]; // commentInput 값을 임시 변수에 저장
//     const newCommentInputs = [...commentInputs]; // 기존 배열 복사
//     newCommentInputs[index] = ""; // 입력 초기화
//     setCommentInputs(newCommentInputs); // 새로운 상태로 업데이트

//     const postComment = async () => {
//       const res = await axios({
//         method: "POST",
//         url: "http://localhost:8000/board/postComment",
//         data: {
//           commentText,
//           userId: username,
//           boardId: e.target.value,
//         },
//       });
//       console.log(res);
//     };

//     postComment().then(() => {
//       const data = {
//         commentText,
//         userId: username,
//         boardId: e.target.value,
//         commentId: commentData[e.target.value]
//           ? commentData[e.target.value].length + 1
//           : 1,
//       };
//       const updatedCommentData = { ...commentData };
//       if (updatedCommentData[e.target.value]) {
//         updatedCommentData[e.target.value].push(data);
//       } else {
//         updatedCommentData[e.target.value] = [data];
//       }
//       setCommentData(updatedCommentData);
//     });
//   };

//   return (
//     <div className="">
//       <img
//         className="boardWriteButton"
//         src="imgs/boardWrite.png"
//         alt=""
//         onClick={writeButton}
//       />
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div>
//           {/* boardBox */}

//           {boards.map((item, index) => (
//             <BoardBox
//               // key={item.boardId}
//               imgSrc={item.img}
//               text={item.text}
//               userId={item.userId}
//               boardId={item.boardId}
//               likeData={likeData && likeData[item.boardId]}
//               commentData={commentData && commentData[item.boardId]}
//               day={item.createdAt}
//               // commentInput={commentInputs[index]}
//               // onPostComment={(e) => postCommentButton(e, index)}
//             />
//           ))}

//           {/* 이전 코드 */}
//           {boards.map((item, index) => {
//             return (
//               <div
//                 style={{
//                   border: "1px solid black",
//                   width: "300px",
//                   textAlign: "center",
//                 }}
//                 key={item.boardId}
//               >
//                 <img
//                   style={{
//                     width: "200px",
//                     height: "200px",
//                     overflowY: "scroll",
//                   }}
//                   src={item.img}
//                   alt=""
//                 />
//                 <p>
//                   <b>게시글 내용: </b> {item.text}
//                 </p>
//                 <p>
//                   <b>게시글 작성자: </b> {item.userId}
//                 </p>

//                 {likeData && likeData[item.boardId]
//                   ? likeData[item.boardId].map((like) => (
//                       <h5 key={like.userId}>
//                         <b>좋아요 수</b>:{" "}
//                         {likeData && likeData[item.boardId]
//                           ? likeData[item.boardId].length
//                           : 0}
//                       </h5>
//                     ))
//                   : null}

//                 {commentData && commentData[item.boardId]
//                   ? commentData[item.boardId].map((comment) => (
//                       <h6 key={comment.commentId}>
//                         <b>{comment.userId}</b>: {comment.commentText}
//                       </h6>
//                     ))
//                   : null}

//                 <input
//                   type="text"
//                   placeholder="댓글 작성"
//                   value={commentInputs[index]}
//                   onChange={(e) => {
//                     const newCommentInputs = [...commentInputs];
//                     newCommentInputs[index] = e.target.value;
//                     setCommentInputs(newCommentInputs);
//                   }}
//                 />
//                 <button
//                   onClick={(e) => postCommentButton(e, index)}
//                   value={item.boardId}
//                 >
//                   작성
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Board;
