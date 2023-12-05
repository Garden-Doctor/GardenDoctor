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
        <div className="inner-container-left">
          <span className="tt">병충해 사진 진단</span>
          <span>사진 업로드 시 병충해 진단</span>
        </div>
        <p>
          <img src={dignose_src} />
        </p>
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
        <div className="inner-container-left">
          <span className="tt">AI 도우미</span>
          <span>작물 관련 질문에 답해주는 채팅봇</span>
        </div>
        <p>
          <img src={ai_src} />
        </p>
      </div>
    </div>
  );
};

export default BottomContent;
