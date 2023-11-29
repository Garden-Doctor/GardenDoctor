import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/imageAI/dignose.scss";
import Dignose2 from "../../imgs/dignose2.svg";
import plantOptions from "./PlantOptions";
import camera from "../../imgs/camera.svg";
import * as tmImage from "@teachablemachine/image";
import GridLoader from "react-spinners/GridLoader";

let model, labelContainer, maxPredictions;

const Dignose = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState("");
  const [loading, setLoading] = useState(false); //react-spinner을 위한 상태관리
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handlePlantSelect = (e) => {
    setSelectedPlant(e.target.value);
  };

  const dignosePlant = async () => {
    let URL;
    console.log("selectedPlant", selectedPlant);
    setLoading(true);

    //식물에 선택에 맞는 URL 불러오기.
    switch (selectedPlant) {
      case "grape":
        URL = "https://teachablemachine.withgoogle.com/models/qX_qUo9Fg/";
        break;
      case "eggPlant":
        URL = "https://teachablemachine.withgoogle.com/models/_iqMdmzJL/";
        break;
      case "pepper":
        URL = "https://teachablemachine.withgoogle.com/models/oDFePDvv-/";
        break;
      case "sweetPumpkin":
        URL = "https://teachablemachine.withgoogle.com/models/jY9AAPL6s/";
        break;
      case "strawberry":
        URL = "https://teachablemachine.withgoogle.com/models/7JqoAYQbO/";
        break;
      case "lettuce":
        URL = "https://teachablemachine.withgoogle.com/models/fAMkn0KNO/";
        break;
      case "watermelon":
        URL = "https://teachablemachine.withgoogle.com/models/wW0TgzYsy";
        break;
      case "squash":
        URL = "https://teachablemachine.withgoogle.com/models/rI5TD20Jm/";
        break;
      case "zucchiniPumpkin":
        URL = "https://teachablemachine.withgoogle.com/models/5woOHDAqq/";
        break;
      case "cucumber":
        URL = "https://teachablemachine.withgoogle.com/models/x7QkPjx0i/";
        break;
      case "melon":
        URL = "https://teachablemachine.withgoogle.com/models/Dy99PfcqR/";
        break;
      case "tomato":
        URL = "https://teachablemachine.withgoogle.com/models/KM_U4mSw6/";
        break;
      // case "potato":
      //   URL = "";
      //   break;
      // case "greenOnion":
      //   URL = "";
      //   break;
      // case "radish":
      //   URL = "";
      //   break;
      // case "onion":
      //   URL = "";
      //   break;
      // case "carrot":
      //   URL = "";
      //   break;
      // case "bean":
      //   URL = "";
      //   break;
      // case "sesame":
      //   URL = "";
      //   break;
      // case "sweetPotato":
      //   URL = "";
      //   break;
      // case "napaCabbage":
      //   URL = "";
      //   break;
      // case "pumpkin":
      //   URL = "";
      //   break;
      // case "cabbage":
      //   URL = "";
      // break;
      default:
        console.log("해당하는 URL이 없습니다.");
        break;
    }
    //URL에 따라 예측하기
    if (URL) {
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

      //선택한 모델 로드
      model = await tmImage.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();

      //이미지 예측 실행
      const result = await predict();
      const image = selectedImage;
      sessionStorage.setItem("selectedImageUrl", image);
      setLoading(false);
      navigate(`/diagnosisResult?result=${result}`);
    } else {
      console.log("식물에 대한 URL이 선택되지 않았습니다.");
    }
  };

  async function predict() {
    //예측 로직 수행
    const image = new Image();
    image.src = selectedImage;
    const prediction = await model.predict(image, false);
    let predictions = "";
    console.log("predict");

    for (let i = 0; i < maxPredictions; i++) {
      predictions +=
        prediction[i].className +
        ":" +
        prediction[i].probability.toFixed(2) +
        "<br>";
    }

    return predictions;
  }

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
    <div>
      {loading ? (
        <div className="dignose-main-container">
          <div className="loading">
            <h5>진단중</h5>
            <GridLoader color="#3CB362" loading={loading} size={80} />
          </div>
        </div>
      ) : (
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

          <select
            name="selectPlant"
            className="selectPlant"
            onChange={handlePlantSelect}
            value={selectedPlant}
          >
            {plantOptions.map((option) => (
              <option key={option.value} value={option.value}>
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
                  ref={fileInputRef}
                  id="file-upload-input"
                  className="fileUploadInput"
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                <div className="drag-text">
                  <h3>
                    <img src={camera} alt="카메라" /> <br></br>클릭하여 이미지
                    추가
                  </h3>
                </div>
              </div>
            )}
          </div>

          <button
            className="diagnosticButton"
            type="submit"
            onClick={dignosePlant}
          >
            진단 받기
          </button>
        </div>
      )}
    </div>
  );
};

export default Dignose;
