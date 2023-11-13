import "../../sytles/dignose.scss";

import Dignose2 from "../../imgs/dignose2.svg";

const Dignose = () => {
  return (
    <div className="dignose-main-container">
      <div className="introduce">
        <img src={Dignose2} />
        <span>농작물 병충해 판단 서비스란?</span>
        <br></br>
        <div className="introduceDetails">
          작물 사진을 업로드하면 병을 신속하게 식별하여 농작물 건강을 돕는
          서비스입니다.
        </div>
      </div>
    </div>
  );
};

export default Dignose;
