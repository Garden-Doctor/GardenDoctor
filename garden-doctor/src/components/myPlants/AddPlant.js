import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
//import "../../styles/writeBoard.scss";
import camera from "../../images/camera.png";

const AddPlant = () => {
  const [boardText, setBoardText] = useState("");
  const [boardTitle, setBoardTitle] = useState("");
  const [imageSelected, setImageSelected] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(""); // 이미지 미리보기 URL
  const username = useSelector((state) => state.user);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const uploadButton = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const files = fileInputRef.current.files;

    // 선택된 파일들을 FormData에 추가
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/upload",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((result) => {
        console.log(result.data);
        const res2 = axios({
          method: "POST",
          url: "http://localhost:8000/board/uploadBoard",
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
      alert("게시글 생성 완료!");
      navigate("/board");
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUploadClick = () => {
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

  return (
    <div className="main-container">
      <div className="writeBoard-container">
        <img
          className="writeBoard-arrow"
          src="imgs/arrow-right.png"
          alt=""
          onClick={beforePage}
        />
        <span className="writeBoard-topSpan">새 게시글 작성</span>
        <form className="writeBoard-form" encType="multipart/form-data">
          {imageSelected ? (
            <div
              className="writeBoard-imageUpload"
              onClick={handleImageUploadClick}
            >
              <div className="writeBoard-imagePreview">
                {/* 이미지 미리보기1 */}
                <img src={imagePreviewUrl} alt="Preview" />
                <span>클릭하여 이미지 추가</span>
              </div>
            </div>
          ) : (
            <div
              className="writeBoard-imageUpload"
              onClick={handleImageUploadClick}
            >
              <img src={camera} alt="카메라" />
              <span>클릭하여 이미지 추가</span>
            </div>
          )}
          <input
            type="file"
            name="image"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
            multiple
          />
          <div className="writeBoard-boardTitle">
            제목 <br />
            <input
              type="text"
              placeholder="제목을 추가해주세요"
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
              onChange={(e) => setBoardText(e.target.value)}
            ></textarea>
          </div>
          <button className="writeBoard-uploadButton" onClick={uploadButton}>
            게시
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPlant;
