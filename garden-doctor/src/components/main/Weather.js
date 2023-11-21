// src/components/Weather.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  const getCurrentWeather = async () => {
    try {
      if (location) {
        const response = await axios.get(
          `/weather?lat=${location.latitude}&lon=${location.longitude}`
        );
        setWeather(response.data);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    // 최초 렌더링 후 5초마다 날씨 정보 업데이트
    const intervalId = setInterval(getCurrentWeather, 5000);

    // 컴포넌트가 마운트될 때 사용자의 현재 위치를 가져옴
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting current position:", error);
      }
    );

    // 컴포넌트가 언마운트될 때 타이머 정리
    return () => clearInterval(intervalId);
  }, []); // 빈 배열을 전달하여 최초 한 번만 실행되도록 함

  return (
    <div className="weather-container">
      <h1>현재 날씨</h1>
      {weather ? (
        <div>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
          {/* Add more weather information as needed */}
        </div>
      ) : (
        <p>현재 날씨 불러오는 중</p>
      )}
    </div>
  );
};

export default Weather;
