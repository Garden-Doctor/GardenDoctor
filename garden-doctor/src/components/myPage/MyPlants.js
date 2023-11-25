import React, { useState, useRef } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../styles/myPlants.scss";

const MyPlants = () => {
  const userId = useSelector((state) => state.user);
  console.log("아이디:", userId);

  const navigate = useNavigate();

  const moveToAddPlant = async () => {
    navigate("./addPlant");
  };
  return (
    <>
      <Container className="myPlant-container">
        <MyPlantTitle>나의 작물</MyPlantTitle>
        <AddPlant onClick={moveToAddPlant}>작물 추가</AddPlant>
        <Row xs={1} md={2}>
          <Col className="myPlant-box">
            <PlantImg></PlantImg>
            <hr className="myPlantBox-line" />
            <PlantName></PlantName>
            <PlantTemp></PlantTemp>
          </Col>
          <Col className="myPlant-box">ㅎㅇㅎㅇ</Col>
          <Col className="myPlant-box">ㅎㅇㅎㅇ</Col>
          <Col className="myPlant-box">ㅎㅇㅎㅇ</Col>
          <Col className="myPlant-box">ㅎㅇㅎㅇ</Col>
          <Col className="myPlant-box">ㅎㅇㅎㅇ</Col>
          <Col className="myPlant-box">ㅎㅇㅎㅇ</Col>
        </Row>
      </Container>
    </>
  );
};

const MyPlantTitle = ({ children }) => {
  return <div className="Title">{children}</div>;
};

const AddPlant = ({ onClick, children }) => {
  return (
    <button onClick={onClick} type="button">
      {children}
    </button>
  );
};

const PlantImg = () => {
  return <img className="myPlantBox-plantImg" alt="plantImg" src=""></img>;
};

const PlantName = () => {
  return <span className="myPlantBox-plantName">작물명</span>;
};

const PlantTemp = () => {
  return <span className="myPlantBox-plantTemp">작물 적정 온도</span>;
};

const PlantPlanted = () => {};
export default MyPlants;
