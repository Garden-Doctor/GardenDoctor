import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
//import "../../styles/writeBoard.scss";
import camera from "../../images/camera.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../styles/myPlants.scss";
import { PageTitle } from "../myPage/MyPlants";
import plantOptions from "../imageAI/PlantOptions";

const AddPlant = () => {
  const [plantNickname, setPlantNickname] = useState("");
  const [selectedPlant, setSelectedPlant] = useState("");
  const [plantDate, setPlantDate] = useState(new Date());
  const [checkMessage, setCheckMessage] = useState("");

  const username = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  const handlePlantSelect = (e) => {
    setSelectedPlant(e.target.value);
  };

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  const uploadButton = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (imgRef.current && imgRef.current.files.length > 0) {
      const file = imgRef.current.files[0];
      formData.append("file", file);
    }
    if (!plantNickname) {
      setCheckMessage("식물 종류를 선택해주세요");
      return;
    }

    try {
      const res1 = await axios({
        method: "POST",
        url: "http://localhost:8000/upload/single",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const res2 = await axios({
        method: "POST",
        url: "http://localhost:8000/myPlants/addPlant",
        data: {
          user_id: username,
          plant_nickname: plantNickname,
          plant_img: res1.data,
          plant_type: selectedPlant,
          plant_date: plantDate,
        },
      });
      console.log("res1", res1);
      console.log("res2", res2);
      alert("작물 추가 완료!");
      navigate("/myPlants");
    } catch (error) {
      console.log(error);
    }
  };

  const beforePage = () => {
    navigate("/myPlants");
  };

  return (
    <Container className="myPlant-container">
      <PageTitle>나의 작물 추가</PageTitle>
      <form className="writeBoard-form" encType="multipart/form-data">
        <div className="signup_img">
          <div className="profile_box">
            <img src={imgFile ? imgFile : `/imgs/user.svg`} alt="식물 이미지" />
          </div>
          <label className="signup-profileImg-label" htmlFor="profileImg">
            식물 이미지 추가
          </label>
          <input
            className="signup-profileImg-input"
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={saveImgFile}
            ref={imgRef}
          />
        </div>

        <div>
          식물 종류
          <br />
          <select
            name="selectPlant"
            className="selectPlant"
            onChange={handlePlantSelect}
            value={selectedPlant}
          >
            {plantOptions.map((option) => (
              <option key={option.value} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="signup_check_box">{checkMessage}</div>

        <div className="writeBoard-boardTitle">
          식물 별명 (선택)
          <br />
          <input
            type="text"
            placeholder="내 식물의 별명을 추가해보세요"
            onChange={(e) => setPlantNickname(e.target.value)}
          />
        </div>
        <div className="writeBoard-boardTitle">
          심은 날:
          <input type="date" onChange={(e) => setPlantDate(e.target.value)} />
        </div>

        <button className="writeBoard-uploadButton" onClick={uploadButton}>
          게시
        </button>
      </form>
    </Container>
  );
};

export default AddPlant;
