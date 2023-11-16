import React from "react";

import "../../styles/main.scss";
import Weather from "./Weather";
import TodayBoard from "./TodayBoard";

import ChatAI from "./ChatAI";
import BottomContent from "./BottomContent";

const Main = () => {
  return (
    <>
      <div className="main-container">
        <Weather></Weather>
        <TodayBoard></TodayBoard>
        <BottomContent />
      </div>
    </>
  );
};

export default Main;
