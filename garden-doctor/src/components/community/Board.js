// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import BoardBox from "./BoardBox";
// import BoardWrite from "../../images/boardWrite.png";

// const Board = () => {
//   const [loading, setLoading] = useState(true);
//   const [boards, setBoards] = useState([]);
//   const [commentInputs, setCommentInputs] = useState([]);
//   const [commentData, setCommentData] = useState(null);
//   const [likeData, setLikeData] = useState(null);
//   const username = useSelector((state) => state.user);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [boardRes, commentRes, likeRes] = await Promise.all([
//           axios.get("http://localhost:8000/board/getBoards"),
//           axios.get("http://localhost:8000/board/getComments"),
//           axios.get("http://localhost:8000/board/getLikes"),
//         ]);

//         const sortedBoards = boardRes.data.sort((a, b) => {
//           const dateA = new Date(a.createdAt);
//           const dateB = new Date(b.createdAt);
//           return dateB - dateA;
//         });

//         const boardsWithUserImg = [];

//         for (const board of sortedBoards) {
//           // Fetch userImg for each userId
//           const userImgRes = await axios.post(
//             "http://localhost:8000/sign/myInfo",
//             {
//               userId: board.userId,
//             }
//           );

//           const url = userImgRes.data.userImg;
//           let cleanedUrl = url?.replace(/^"(.*)"$/, "$1");
//           console.log(cleanedUrl);

//           const boardWithUserImg = {
//             ...board,
//             userImg: cleanedUrl, // Replace with the actual field name from your API
//           };

//           boardsWithUserImg.push(boardWithUserImg);
//         }

//         setBoards(boardsWithUserImg);
//         console.log(boards);

//         setCommentInputs(new Array(sortedBoards.length).fill(""));

//         const groupedCommentData = groupCommentsByBoardId(commentRes.data);
//         setCommentData(groupedCommentData);

//         const groupedLikeData = groupLikesByBoardId(likeRes.data);
//         setLikeData(groupedLikeData);

//         setLoading(false);

//         console.log("userReduxName: " + username);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

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
//     if (!username) {
//       alert("로그인 해주세요.");
//       navigate("/login");
//     } else {
//       navigate("/writeBoard");
//     }
//   };

//   const postCommentButton = async (e, index) => {
//     try {
//       const commentText = commentInputs[index];

//       const postCommentRes = await axios.post(
//         "http://localhost:8000/board/postComment",
//         {
//           commentText,
//           userId: username,
//           boardId: e.target.value,
//         }
//       );

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
//       setCommentInputs((prevInputs) =>
//         prevInputs.map((input, i) => (i === index ? "" : input))
//       );
//     } catch (error) {
//       console.error("Error posting comment:", error);
//     }
//   };

//   return (
//     <div className="">
//       <img
//         className="boardWriteButton"
//         src={BoardWrite}
//         alt=""
//         onClick={writeButton}
//       />
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="large-container">
//           <img
//             className="boardWriteButton"
//             src={BoardWrite}
//             alt=""
//             onClick={writeButton}
//           />
//           {boards.map((item, index) => (
//             <BoardBox
//               key={item.boardId}
//               imgSrc={item.img}
//               text={item.text}
//               title={item.title}
//               userId={item.userId}
//               userImg={item.userImg}
//               boardId={item.boardId}
//               likeData={likeData && likeData[item.boardId]}
//               commentData={commentData && commentData[item.boardId]}
//               day={item.createdAt}
//               commentInput={commentInputs[index]}
//               onPostComment={(e) => postCommentButton(e, index)}
//               navigate={navigate}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Board;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import BoardBox from "./BoardBox";
import BoardWrite from "../../images/boardWrite.png";
import { useSelectedButton } from "../SelectedButtonContext";
import boardImg from "../../images/boardImg.png";

const Board = () => {
  const { selectedButton, setSelectedButton } = useSelectedButton();

  const [loading, setLoading] = useState(true);
  const [boards, setBoards] = useState([]);
  const [commentInputs, setCommentInputs] = useState([]);
  const [commentData, setCommentData] = useState(null);
  const [likeData, setLikeData] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const username = useSelector((state) => state.user);
  const nickName = useSelector((state) => state.nickname);

  useEffect(() => {
    const URL = process.env.SERVER_URL;
    console.log(nickName);
    console.log(URL);
    console.log(process.env.SERVER_URL);
    const fetchData = async () => {
      try {
        const [boardRes, commentRes, likeRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_SERVER_URL}/board/getBoards`),
          axios.get(`${process.env.REACT_APP_SERVER_URL}/board/getComments`),
          axios.get(`${process.env.REACT_APP_SERVER_URL}/board/getLikes`),
        ]);

        const sortedBoards = boardRes.data.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });

        const boardsWithUserImg = sortedBoards.map(async (board) => {
          const userImgRes = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/sign/myInfo`,
            {
              userId: board.userId,
            }
          );

          const url = userImgRes.data.userImg;
          const nickname = userImgRes.data.nickName;
          let cleanedUrl = url?.replace(/^"(.*)"$/, "$1");

          return {
            ...board,
            userImg: cleanedUrl,
            nickname: nickname, // 닉네임 추가
          };
        });

        Promise.all(boardsWithUserImg).then((result) => {
          setBoards(result);
          setLoading(false);
        });

        setCommentInputs(new Array(sortedBoards.length).fill(""));

        const groupedCommentData = groupCommentsByBoardId(commentRes.data);
        setCommentData(groupedCommentData);

        const groupedLikeData = groupLikesByBoardId(likeRes.data);
        setLikeData(groupedLikeData);
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

  const writeButton = async () => {
    if (!username) {
      alert("로그인 해주세요.");
      await navigate("/login");
    } else {
      setSelectedButton("board");
      await navigate("/writeBoard");
    }
  };

  const postCommentButton = async (e, index) => {
    try {
      const commentText = commentInputs[index];

      const postCommentRes = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/board/postComment`,
        {
          commentText,
          userId: username,
          boardId: e.target.value,
          nickName: nickName,
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

  // 검색어를 기반으로 게시물을 필터링하는 함수
  const filteredBoards = boards.filter(
    (board) =>
      board.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      board.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="">
      <img
        className="boardWriteButton"
        src={BoardWrite}
        alt=""
        onClick={writeButton}
      />
      <div className="boardImg">
        <img src={boardImg} alt="" />
        소통의 정원
      </div>
      <div className="searchInput">
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
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
          {filteredBoards.map((item, index) => (
            <BoardBox
              key={item.boardId}
              imgSrc={item.img}
              text={item.text}
              title={item.title}
              userId={item.userId}
              nickname={item.nickname}
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
