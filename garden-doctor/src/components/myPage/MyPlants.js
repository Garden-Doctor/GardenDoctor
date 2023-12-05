import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import POST_icon from "../../imgs/post.png";
import "../../styles/myPlants.scss";

const MyPlants = () => {
  const userId = useSelector((state) => state.user);
  const [myPlants, setMyPlants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getMyPlants = async () => {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/myPlants",
        data: { user_id: userId },
      });
      setMyPlants(res.data);
    };
    getMyPlants();
  }, [userId]);

  const moveToAddPlant = async () => {
    navigate("./addPlant");
  };

  const moveToPostJournal = async (e, plantId) => {
    e.stopPropagation();
    navigate(`/writeBoard/${userId}/${plantId}`);
  };

  const moveToPlantDetail = async (plantId) => {
    navigate(`./plantDetail/${userId}/${plantId}`);
  };
  return (
    <>
      <Container className="myPlant-container">
        <PageTitle>나의 작물</PageTitle>
        <AddPlant onClick={moveToAddPlant}>작물 추가</AddPlant>
        <Row xs={1} md={2}>
          {myPlants.map((plant, i) => (
            <Col
              className="myPlant-box"
              key={i}
              onClick={() => {
                moveToPlantDetail(plant.myPlant_id);
              }}
            >
              <PlantImg src={plant.plant_img}></PlantImg>
              <hr className="myPlantBox-line" />
              <PlantName>{plant.PlantTypes[0].plant_type}</PlantName>
              <PlantNickname>{plant.plant_nickname}</PlantNickname>
              <PlantPlanted>{plant.plant_date}</PlantPlanted>
              <PostJournalButton
                onClick={(e) => {
                  moveToPostJournal(e, plant.myPlant_id);
                }}
              ></PostJournalButton>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

const PageTitle = ({ children }) => {
  return <div className="Title">{children}</div>;
};

const AddPlant = ({ onClick, children }) => {
  return (
    <button onClick={onClick} type="button" className="myPlantbox-addPlant">
      {children}
    </button>
  );
};

const PlantImg = ({ src }) => {
  return <img className="myPlantBox-plantImg" alt="plantImg" src={src}></img>;
};

const PlantName = ({ children }) => {
  return <span className="myPlantBox-plantName">{children}</span>;
};

const PlantNickname = ({ children }) => {
  return <span className="myPlantBox-plantNickname">{children}</span>;
};

const PlantPlanted = ({ children }) => {
  return <span className="myPlantBox-plantPlanted">{children}</span>;
};

const PostJournalButton = ({ onClick }) => {
  return (
    <button
      type="button"
      className="myPlantBox-PostJournalButton"
      onClick={onClick}
    >
      <img src={POST_icon} alt="postIcon" />
    </button>
  );
};
export {
  MyPlants,
  PageTitle,
  AddPlant,
  PlantImg,
  PlantName,
  PlantNickname,
  PlantPlanted,
  PostJournalButton,
};
