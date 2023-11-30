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
        <span>
          사진을 업로드하면 간단하게 병충해 진단을 제공하는 서비스입니다
        </span>
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
        <span>
          작물에 관한 모든 궁금증을 해결하는 똑똑한 AI 채팅 서비스입니다
        </span>
      </div>
    </div>
  );
};

export default BottomContent;
