import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(null);

  useEffect(() => {
    // 접속 시 위치 정보 담기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // console.log(latitude, longitude);
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting current location:", error.message);
        }
      );
    }

    // 현재 날짜와 시간 가져오기
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentDateTime(now);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // 현재 위치가 설정되면 서버에 날씨 정보 요청
    if (currentLocation) {
      fetchWeatherData();
    }
  }, [currentLocation]);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.post("http://localhost:8000/weather", {
        currentdate: getCurrentDate(),
        currenttime: getCurrentTime(),
        inputx: currentLocation.latitude,
        inputy: currentLocation.longitude,
      });

      const data = response;
      console.log("날씨", data);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const getCurrentDate = () => {
    if (currentDateTime) {
      const year = currentDateTime.getFullYear();
      const month = currentDateTime.getMonth() + 1;
      const day = currentDateTime.getDate();

      return `${year}${month < 10 ? "0" + month : month}${
        day < 10 ? "0" + day : day
      }`;
    }

    return "";
  };

  // 분 단위 버리고 정시만 담게
  const getCurrentTime = () => {
    if (currentDateTime) {
      const hours = currentDateTime.getHours();
      return `${hours < 10 ? "0" + hours : hours}00`;
    }
    return "";
  };

  return (
    <div>
      <p>Current Date: {getCurrentDate()}</p>
      <p>Current Time: {getCurrentTime()}</p>
      {weatherData && (
        <div>
          <h2>Weather Information</h2>
          {/* {weatherData.TMP} */}
          {/* <p>Temperature: {weatherData.TMP}</p>
          <p>Precipitation Probability: {weatherData.POP}</p>
          <p>Precipitation Amount: {weatherData.PCP}</p> */}
          {/* 기타 필요한 날씨 정보를 표시하는 부분 */}
        </div>
      )}
    </div>
  );
};

export default Weather;
