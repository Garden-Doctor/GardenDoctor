import React, { useState, useRef } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../styles/myPlants.scss";

const MyPlants = () => {
  return (
    <Container className="myPlant-container">
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

const PlantPlanted = () => {
    
}
export default MyPlants;
