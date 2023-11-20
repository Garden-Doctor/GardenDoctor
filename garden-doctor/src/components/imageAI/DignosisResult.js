import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/imageAI/dignosisResult.scss";

const DignosisResult = () => {
  const [result, setResult] = useState("");
  const [image, setImage] = useState("");
  const [probabilitys, setProbabilitys] = useState("");
  const [explanations, setExplanations] = useState("");
  const [solutions, setSolutions] = useState("");
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const resultParam = searchParams.get("result");
    const imageURL = sessionStorage.getItem("selectedImageUrl");
    if (resultParam) {
      //결과들 중에서 숫자만 추출하기.
      const probabilies = resultParam.split("<br>").map((item) => {
        const [disease, probabilityStr] = item.split(":");
        return {
          disease,
          probability: isNaN(probabilityStr) ? 0 : probabilityStr,
        };
      });
      console.log("probabilies", probabilies);

      //숫자들끼리 비교해서 제일 높은 것 찾기
      const maxProbability = Math.max(
        ...probabilies.map((item) => item.probability)
      );
      setProbabilitys(maxProbability * 100);
      console.log("maxProbability: ", maxProbability);
      //해당 확률의 병 찾기
      const maxProbabilityItem = probabilies.find(
        (item) => parseFloat(item.probability) === maxProbability
      );
      console.log("maxProbabilityItem: ", maxProbabilityItem);

      if (maxProbabilityItem) {
        setResult(maxProbabilityItem.disease);
        console.log(maxProbabilityItem.disease);
        //axios를 사용하여 서버로 데이터 보냄.
        axios
          .post("http://localhost:8000/dignosisResult", {
            result: maxProbabilityItem.disease,
          })
          .then((response) => {
            setExplanations(response.data.explanation);
            setSolutions(response.data.solution);
            console.log("받아옴", response);
          })
          .catch((error) => {
            console.log("error", error);
          });
      } else {
        setResult("병을 진단할 수 없습니다. 다시 시도해주시기 바랍니다.");
      }
    } else {
      setResult("병을 진단할 수 없습니다. 다시 시도해주시기 바랍니다.");
    }

    if (imageURL) {
      setImage(imageURL);
    }
  }, [location.search]);

  const navigate = useNavigate();

  const chatButton = () => {
    navigate("/chat");
  };
  const imageAIButton = () => {
    navigate("/imageAI");
  };

  return (
    <div className="dignosisResult-main-container">
      <h2 className="title">병충해 진단 결과</h2>
      <div className="input-image">
        {image && <img src={image} alt="입력한 이미지" />}
      </div>
      <p>
        이 작물은 {probabilitys}% {result}입니다.
      </p>
      <div className="plantSolutions">
        <div className="explanation">{explanations}</div>
        <div className="solutionTitle">해결책</div>
        <div className="solution">{solutions}</div>
      </div>
      <div className="chat">
        <div className="chatAI">더 자세한 질문을 하고 싶으신가요?</div>
        <button className="chatAIButton" onClick={chatButton}>
          AI 도우미
        </button>
      </div>
      <div className="image">
        <div className="imageAI">다른 작물에 대한 진단을 받고 싶으신가요?</div>
        <button className="imageAIButton" onClick={imageAIButton}>
          진단하기
        </button>
      </div>
    </div>
  );
};
export default DignosisResult;
