import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DignosisResult = () => {
  const [result, setResult] = useState("");
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const resultParam = searchParams.get("result");
    if (resultParam) {
      setResult(resultParam);
    }
  }, [location.search]);

  return (
    <div>
      <h2>진단 결과</h2>
      <p>{result}</p>
    </div>
  );
};
export default DignosisResult;
