import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  PageTitle,
  PlantImg,
  PlantName,
  PlantNickname,
  PlantPlanted,
} from "../myPage/MyPlants";
import POST_icon from "../../imgs/post.png";
import "../../styles/myPlants.scss";

const PlantDetail = () => {
  const userId = useSelector((state) => state.user);
  const { URLuserId, plantId } = useParams();
  const [myPlant, setMyPlant] = useState();
  const navigate = useNavigate();
  console.log("url", URLuserId, plantId);

  useEffect(() => {
    const getMyPlant = async () => {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/myPlants/plantDetail",
        data: { user_id: URLuserId, myPlant_id: plantId },
      });
      setMyPlant(res.data);
      console.log(res.data);
    };
    getMyPlant();
  }, []);

  const moveToAddPlant = async () => {
    navigate("./addPlant");
  };

  const moveToPostJournal = async (plantId) => {
    navigate(`/writeBoard/${userId}/${plantId}`);
  };

  const moveToPlantDetail = async (plantId) => {
    navigate(`./plantDetail/${userId}/${plantId}`);
  };
  return (
    <>
      <Container className="myPlant-container">
        <Row xs={1} md={2}>
          {myPlant && (
            <Col className="myPlant-box">
              <PlantImg src={myPlant.plant_img}></PlantImg>
              <hr className="myPlantBox-line" />
              <PlantName>{myPlant.PlantTypes[0].plant_type}</PlantName>
              <PlantNickname>{myPlant.plant_nickname}</PlantNickname>
              <PlantPlanted>{myPlant.plant_date}</PlantPlanted>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default PlantDetail;
