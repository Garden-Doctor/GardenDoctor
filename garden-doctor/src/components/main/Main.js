import React, { useEffect, useState, useMemo } from "react";
import useCurrentLocation from "../hooks/useCurrentLocation";

import "../sytles/main.scss";

import AI_SRC from "../imgs/ai.svg";
import COMMUNITY_SRC from "../imgs/community.svg";
import SIMULATION_SRC from "../imgs/simulation.svg";
import DIGNOSE_SRC from "../imgs/dignose.svg";

// const geolocationOptions = {
//   enableHighAccuracy: true,
//   timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
//   maximumAge: 1000 * 3600 * 24, // 24 hour
// };

const Main = () => {
  // const { location, error } = useCurrentLocation();

  return (
    <div className="main-container">
      <div className="weather">
        {/* {(location.latitude, location.longitude)} */}
        <div className="weather-content">weather</div>
      </div>
      <div className="content01">
        <div className="content01-simulation">
          <img src={SIMULATION_SRC} />
          <a href="/simulation">작물 성장 시뮬레이션</a>
        </div>
        <div className="content01-dignose">
          <img src={DIGNOSE_SRC} />
          <a href="/analysis">병충해 진단 서비스</a>
        </div>
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
