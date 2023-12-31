import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../styles/writeBoard.scss";
import arrowRight from "../../images/arrow-right.png";
import camera from "../../images/camera.png";

import { useSelectedButton } from "../SelectedButtonContext";

const EditBoard = () => {
  const { selectedButton, setSelectedButton } = useSelectedButton();

  const { userId, boardId } = useParams();
  const [boardData, setBoardData] = useState(null);
  const [prevImageNum, setPrevImageNum] = useState("");
  const [boardText, setBoardText] = useState("");
  const [boardTitle, setBoardTitle] = useState("");
  const [boardImg, setBoardImg] = useState("");
  const [imageSelected, setImageSelected] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(""); // 이미지 미리보기 URL
  const username = useSelector((state) => state.user);
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Ref를 사용하여 input 엘리먼트에 접근

  useEffect(() => {
    const fetchData = async () => {
      setSelectedButton("board");
      try {
        console.log("Fetching data...");
        const boardResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/board/getBoard/${boardId}`
        );
        console.log("Data fetched:", boardResponse);
        setBoardData(boardResponse.data);
        setBoardTitle(boardResponse.data.title);
        setBoardText(boardResponse.data.text);
        setBoardImg(boardResponse.data.img);
        setPrevImageNum(boardResponse.data.img.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [boardId]);

  const uploadButton = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const files = fileInputRef.current.files;

    if (files[0] == null) {
      try {
        const res = axios({
          method: "PATCH",
          url: `${process.env.REACT_APP_SERVER_URL}/board/updateBoard/${boardId}`,
          data: {
            userId: username,
            title: boardTitle,
            text: boardText,
            img: boardImg,
          },
        }).then((result) => {
          console.log(result.data);
        });
        console.log(res);
        alert("게시글 수정 완료!");
        navigate("/board");
      } catch (error) {
        console.log(error);
      }
    } else {
      // 선택된 파일들을 FormData에 추가
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      try {
        const res = await axios({
          method: "POST",
          url: `${process.env.REACT_APP_SERVER_URL}/upload`,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((result) => {
          console.log(result.data);
          const res2 = axios({
            method: "PATCH",
            url: `${process.env.REACT_APP_SERVER_URL}/board/updateBoard/${boardId}`,
            data: {
              userId: username,
              title: boardTitle,
              text: boardText,
              img: result.data,
            },
          });
          console.log(res2);
        });
        console.log("res", res);
        alert("게시글 수정 완료!");
        navigate("/board");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleImageUploadClick = () => {
    // input 엘리먼트 클릭
    fileInputRef.current.click();
  };

  const handleImageChange = () => {
    const file = fileInputRef.current.files[0];
    setImageSelected(true);
    setPrevImageNum(fileInputRef.current.files.length);

    // 이미지 미리보기 URL 설정
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const beforePage = () => {
    navigate("/board");
  };

  if (!boardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-container">
      <div className="writeBoard-container">
        <img
          className="writeBoard-arrow"
          src={arrowRight}
          alt=""
          onClick={beforePage}
        />
        <span className="writeBoard-topSpan">게시글 수정</span>
        <form className="writeBoard-form" encType="multipart/form-data">
          {imageSelected ? (
            <div
              className="writeBoard-imageUpload"
              onClick={handleImageUploadClick}
            >
              <div className="writeBoard-imagePreview">
                {/* 이미지 미리보기11 */}
                <img src={imagePreviewUrl} alt="Preview" />
                <span>{prevImageNum}개의 이미지가 선택되었습니다</span>
              </div>
            </div>
          ) : (
            <div
              className="writeBoard-imageUpload"
              onClick={handleImageUploadClick}
            >
              <img src={boardData.img[0]} alt="카메라" />
              <span>{prevImageNum}개의 이미지가 선택되었습니다</span>
            </div>
          )}
          <input
            type="file"
            name="image"
            ref={fileInputRef}
            style={{ display: "none" }} // 숨겨진 input 엘리먼트
            onChange={handleImageChange}
            multiple
          />
          <div className="writeBoard-boardTitle">
            제목 <br />
            <input
              type="text"
              placeholder="제목을 추가해주세요"
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
            />
          </div>
          <div className="writeBoard-boardContent">
            내용 <br />
            <textarea
              name="boardText"
              id="boardText"
              cols="30"
              rows="10"
              placeholder="내용을 추가해주세요"
              value={boardText}
              onChange={(e) => setBoardText(e.target.value)}
            >
              {boardData.text}
            </textarea>
          </div>
          <button className="writeBoard-uploadButton" onClick={uploadButton}>
            수정
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBoard;
