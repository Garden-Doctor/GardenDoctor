import React from "react";
import { useNavigate } from "react-router-dom";
import dignose_src from "../../images/dignose.svg";
import ai_src from "../../images/ai.svg";

const BottomContent = () => {
  return (
    <>
      <Dignore />
      <ChatAI />
    </>
  );
};

const Dignore = () => {
  const navigate = useNavigate();

  const dignoseClick = () => {
    navigate("/imageAI");
  };

  const ChatAIClick = () => {
    navigate("/chat");
  };

  return (
    <div className="dignose-container" onClick={dignoseClick}>
      <div className="inner-container">
        <p>병충해 사진 진단</p>
        <p>
          <img src={dignose_src} />
        </p>
        <p>사진을 통해 병충해를 간단하게 진단해주는 서비스</p>
      </div>
    </div>
  );
};

const ChatAI = () => {
  const navigate = useNavigate();

  const ChatAIClick = () => {
    navigate("/chat");
  };

  return (
    <div className="chatAI-container" onClick={ChatAIClick}>
      <div className="inner-container">
        <p>AI 도우미</p>
        <p>
          <img src={ai_src} />
        </p>
        <p>작물을 키우면서 모르는 점을 질문하세요</p>
      </div>
    </div>
  );
};

export default BottomContent;
