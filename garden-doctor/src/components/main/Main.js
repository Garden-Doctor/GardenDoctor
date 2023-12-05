import React from "react";

import "../../styles/main.scss";
import Weather from "./Weather";
import Weather2 from "./Weather2";
import TodayBoard from "./TodayBoard";

import ChatAI from "./ChatAI";
import BottomContent from "./BottomContent";

const Main = () => {
  const str = "아a녕ㅇ";

  console.log(`${str} ${str.length}`);

  return (
    <>
      <div className="main-container">
        <Weather2></Weather2>
        <TodayBoard></TodayBoard>
        <BottomContent />
      </div>
      {}
    </>
  );
};

export default Main;
