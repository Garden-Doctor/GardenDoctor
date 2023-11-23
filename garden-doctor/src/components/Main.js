import React, { useEffect, useState, useRef } from "react";
import "../styles/main.scss";

import AI_SRC from "../imgs/ai.svg";
import COMMUNITY_SRC from "../imgs/community.svg";
import SIMULATION_SRC from "../imgs/simulation.svg";
import DIGNOSE_SRC from "../imgs/dignose.svg";
import Dignose from "./imageAI/Dignose";
import { useNavigate } from "react-router-dom";

const Main = () => {
  return (
    <div className="main-container">
      <div className="content01">
        <div className="content01-simulation">
          <img src={SIMULATION_SRC} />
          <a href="/simulation">작물 성장 시뮬레이션</a>
        </div>
        <div className="content01-dignose">
          <img src={DIGNOSE_SRC} />
          <a href="/imageAI">병충해 진단 서비스</a>
        </div>
      </div>
      <div className="weather">
        <div className="weather-content">weather</div>
      </div>
      <div className="ai">
        <div className="ai-content">
          <span>텃밭에서의 모든 의문을 해결하는 AI 도우미!</span>
          <span>작물 성장, 환경 조건, 모든 것을 질문하세요</span>
          <img src={AI_SRC} />
        </div>
      </div>
      <div className="community">
        <div className="community-content">
          <span>텃밭을 사랑하는 가드너들을 위한 소통의 정원!</span>
          <span>함께 가꾸는 즐거움을 공유하세요</span>
          <img src={COMMUNITY_SRC} />
        </div>
      </div>
    </div>
  );
};

export default Main;
