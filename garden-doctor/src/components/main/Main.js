import React from "react";

import "../../sytles/main.scss";
import Weather from "./Weather";
import TodayBoard from "./TodayBoard";
import Dignore from "./Dignore";
import ChatAI from "./ChatAI";

const Main = () => {
  return (
    <>
      <div className="main-container">
        <Weather></Weather>
        <TodayBoard></TodayBoard>
        <Dignore></Dignore>
      </div>
    </>
  );
};

export default Main;
