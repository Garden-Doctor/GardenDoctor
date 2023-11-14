import React from "react";

const BottomContent = () => {
  return (
    <>
      <Dignore />
      <ChatAI />
    </>
  );
};

const Dignore = () => {
  return (
    <div className="dignose-container">
      <div className="inner-container">
        <p>병충해 사진 진단</p>
        <p>
          <img src="imgs/dignose.svg" />
        </p>
        <p>사진을 통해 병충해를 간단하게 진단해주는 서비스</p>
      </div>
    </div>
  );
};

const ChatAI = () => {
  return (
    <div className="chatAI-container">
      <div className="inner-container">
        <p>AI 도우미</p>
        <p>
          <img src="imgs/ai.svg" />
        </p>
        <p>작물을 키우면서 모르는 점을 질문하세요</p>
      </div>
    </div>
  );
};

export default BottomContentx;
