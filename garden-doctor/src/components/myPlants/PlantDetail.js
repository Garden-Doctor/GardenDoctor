import React, { useState, useRef, useEffect, useMemo } from "react";
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
import {
  VerticalTimeline,
  VerticalTimelineElement,
  WorkIcon,
  SchoolIcon,
  StarIcon,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const PlantDetail = () => {
  const userId = useSelector((state) => state.user);
  const { URLuserId, plantId } = useParams();
  const [myPlant, setMyPlant] = useState();
  const [plantBoards, setPlantBoards] = useState([]);
  const [expandedStates, setExpandedStates] = useState([]);

  const navigate = useNavigate();
  console.log("url", URLuserId, plantId);
  console.log("plant Boards", plantBoards);

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
    const getPlantBoard = async () => {
      const res2 = await axios({
        method: "POST",
        url: "http://localhost:8000/board/getPlantBoard",
        data: { user_id: URLuserId, myPlant_id: plantId },
      });
      setPlantBoards(res2.data);
      console.log(res2.data);
    };
    getMyPlant();
    getPlantBoard();
  }, []);
  const isSameDate = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  let prevDate = null; // Initialize previous date reference

  const reversedPlantBoards = useMemo(() => {
    return plantBoards.slice().reverse();
  }, [plantBoards]);

  const toggleTextExpanded = (e, index) => {
    e.stopPropagation();
    const newExpandedStates = [...expandedStates];
    newExpandedStates[index] = !newExpandedStates[index];
    setExpandedStates(newExpandedStates);
  };

  const moveToPlantDetail = (userId, boardId) => {
    navigate(`/boardDetail/${userId}/${boardId}`);
  };
  return (
    <>
      <Container className="myPlant-container">
        <Row xs={1} md={2} className="plantDetail-row">
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
        <br />
        <div className="plantDetail-midTitle">기록</div>
        <br />
        <VerticalTimeline layout="1-column-left">
          {reversedPlantBoards &&
            reversedPlantBoards.map((board, i) => {
              const createdAtDate = new Date(board.createdAt);
              const month = createdAtDate.getMonth() + 1;
              const day = createdAtDate.getDate();
              // Check if the current date is the same as the previous date
              const displayIcon =
                !prevDate || !isSameDate(prevDate, createdAtDate);

              // Update the previous date reference
              prevDate = createdAtDate;
              return (
                <VerticalTimelineElement
                  key={i}
                  className="vertical-timeline-element--work"
                  contentStyle={{ background: "white", color: "black" }}
                  contentArrowStyle={{ borderRight: "7px solid  white" }}
                  onTimelineElementClick={() => {
                    moveToPlantDetail(board.userId, board.boardId);
                  }}
                  style={{ margin: "1em 0" }}
                  iconClassName="timeline-icon"
                  icon={
                    <>
                      <span
                        style={{
                          color: "green",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        {month}
                      </span>

                      <span style={{ fontWeight: "bold" }}>{day}</span>
                    </>
                  }
                  iconStyle={
                    displayIcon
                      ? { backgroundColor: "white" }
                      : { display: "none" }
                  }
                >
                  <h2 className="vertical-timeline-element-title">
                    {board.title}
                  </h2>
                  <p onClick={(e) => toggleTextExpanded(e, i)}>
                    {expandedStates[i]
                      ? board.text
                      : board.text.length > 50
                      ? `${board.text.slice(0, 50)}...`
                      : board.text}
                    {board.text.length > 50 && (
                      <span style={{ color: "green", cursor: "pointer" }}>
                        {expandedStates[i] ? " 접기" : " 더보기"}
                      </span>
                    )}
                  </p>

                  <div className="plantDetail-imgContainer">
                    {board.img.length > 0 &&
                      board.img.map((i, index) => {
                        return (
                          <div className="plantDetail-imgBox">
                            <img
                              key={index}
                              className="plantDetail-img"
                              alt="userImg"
                              src={i}
                            ></img>
                          </div>
                        );
                      })}
                  </div>
                </VerticalTimelineElement>
              );
            })}
        </VerticalTimeline>
      </Container>
    </>
  );
};

export default PlantDetail;
