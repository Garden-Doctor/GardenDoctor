import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../styles/writeBoard.scss";

const EditBoard = () => {
  const { userId, boardId } = useParams();
  const [boardData, setBoardData] = useState(null);
  const [boardText, setBoardText] = useState("");
  const [imageSelected, setImageSelected] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(""); // 이미지 미리보기 URL
  const username = useSelector((state) => state.user);
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Ref를 사용하여 input 엘리먼트에 접근

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const boardResponse = await axios.get(
          `http://localhost:8000/board/getBoard/${boardId}`
        );
        console.log("Data fetched:", boardResponse);
        setBoardData(boardResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [boardId]);

  const uploadButton = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const file = fileInputRef.current.files[0];

    if (file) {
      formData.append("files", file);
    }

    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:8000/upload",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((result) => {
        console.log(result.data);
        const res2 = axios({
          method: "PATCH",
          url: `http://localhost:8000/board/updateBoard/${boardId}`,
          data: {
            userId: username,
            text: boardText,
            img: result.data,
          },
        });
        console.log(res2);
      });
      console.log("res", res);
      alert("게시글 생성 완료!");
      navigate("/board");
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUploadClick = () => {
    // input 엘리먼트 클릭
    fileInputRef.current.click();
  };

  const handleImageChange = () => {
    const file = fileInputRef.current.files[0];
    setImageSelected(true);

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
          src="imgs/arrow-right.png"
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
                {/* 이미지 미리보기 */}
                <img src={imagePreviewUrl} alt="Preview" />
                <span>클릭하여 이미지 추가</span>
              </div>
            </div>
          ) : (
            <div
              className="writeBoard-imageUpload"
              onClick={handleImageUploadClick}
            >
              <img src={boardData.img} alt="카메라" />
              <span>클릭하여 이미지 추가</span>
            </div>
          )}
          <input
            type="file"
            name="image"
            ref={fileInputRef}
            style={{ display: "none" }} // 숨겨진 input 엘리먼트
            onChange={handleImageChange}
          />
          <div className="writeBoard-boardTitle">
            제목 <br />
            <input type="text" />
          </div>
          <div className="writeBoard-boardContent">
            내용 <br />
            <textarea
              name="boardText"
              id="boardText"
              cols="30"
              rows="10"
              placeholder="내용을 추가해주세요"
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
