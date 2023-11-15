import React, { useRef, useState } from "react";
import "../../styles/dignose.scss";
import Dignose2 from "../../imgs/dignose2.svg";
import plantOptions from "./PlantOptions";
import camera from "../../imgs/camera.svg";

const Dignose = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const resetImage = () => {
    document.getElementById("fileUploadInput").value = "";
    setSelectedImage(null);
  };

  return (
    <div className="dignose-main-container">
      <div className="introduce">
        <img src={Dignose2} alt="농작물 이미지" />
        <span className="title">농작물 병충해 판단 서비스란?</span>
        <br />
        <div className="introduceDetails">
          작물 사진을 업로드하면 병을 신속하게 식별하여 농작물 건강을 돕는
          서비스입니다.
        </div>
      </div>

      <select name="selectPlant" className="selectPlant">
        {plantOptions.map((option) => (
          <option key={option.value} value={option.label}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="fileUpload">
        {selectedImage && (
          <div className="fileUploadContent">
            <img
              className="fileUploadImage"
              src={selectedImage}
              alt="업로드된 이미지"
              onClick={handleImageClick}
            />
            <input
              ref={fileInputRef}
              id="file-upload-input"
              className="fileUploadInput"
              type="file"
              onChange={handleImageChange}
            />
          </div>
        )}

        {!selectedImage && (
          <div className="imageUploadWrap">
            <input
              id="file-upload-input"
              className="fileUploadInput"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
            <div className="drag-text">
              <h3>
                <img src={camera} alt="카메라" /> <br></br>클릭하여 이미지 추가
              </h3>
            </div>
          </div>
        )}
      </div>

      <button className="diagnosticButton" type="submit">
        진단 받기
      </button>
    </div>
  );
};

export default Dignose;
