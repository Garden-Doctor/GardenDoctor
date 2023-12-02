import React, { useState, useEffect } from "react";
import axios from "axios";
import manyclouds from "../../images/구름많음.svg";
import cloudy from "../../images/cloudy.svg";
import rainy from "../../images/rainy.svg";
import sunny from "../../images/sunny.svg";
import location_src from "../../images/location.svg";

const Weather = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(null);
  const [location, setLocation] = useState(null);
  const [sky, setSky] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting current location:", error.message);
        }
      );
    }
  }, []);

  useEffect(() => {
    // 현재 위치가 설정되면 서버에 날씨 정보 요청
    if (currentLocation) {
      console.log("currentLocation", currentLocation);
      fetchWeatherData();
      fetchLocationData();
    }
  }, [currentLocation]);

  const fetchLocationData = async () => {
    try {
      const res = await axios.post("http://localhost:8000/weather/location", {
        lat: currentLocation.latitude,
        lng: currentLocation.longitude,
      });
      const locationData = res.data;
      setLocation(locationData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.post("http://localhost:8000/weather", {
        currentdate: getCurrentDate(),
        currenttime: getCurrentTime(),
        inputx: currentLocation.latitude,
        inputy: currentLocation.longitude,
      });

      const data = response.data;
      console.log("날씨", data);
      console.log("날씨", data.SKY);

      setWeatherData(data);

      if (data.PTY == 0) {
        switch (data.SKY) {
          case "1":
            setSky("맑음");
            break;
          case "3":
            setSky("구름많음");
            break;
          case "4":
            setSky("흐림");
            break;
        }
      } else {
        setSky("비");
      }

      console.log("", sky);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    if (weatherData) {
      console.log("weatherData", weatherData);
    }
  }, [weatherData]);

  const getWeatherImage = () => {
    switch (sky) {
      case "맑음":
        return sunny;
      case "구름많음":
        return manyclouds;
      case "흐림":
        return cloudy;
      case "비":
        return rainy;
      default:
        return ""; // 실제 파일 경로로 바꾸세요
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

  const viewedCurrentDate = () => {
    if (currentDateTime) {
      const year = currentDateTime.getFullYear();
      const month = currentDateTime.getMonth() + 1;
      const day = currentDateTime.getDate();

      // 0부터 6까지의 값을 가지며, 일요일부터 토요일까지 순서대로입니다.
      const dayOfWeek = currentDateTime.getDay();

      // dayOfWeek를 사용하여 실제 요일을 얻습니다.
      const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
      const todayOfWeek = daysOfWeek[dayOfWeek];

      return `${year}.${month}.${day}(${todayOfWeek})`;
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
    <div className="weather-container">
      {weatherData ? (
        <div className="weather-container-inner">
          <div className="weather_left">
            <div>
              <img src={location_src} />
              {location}
            </div>
            <span>{viewedCurrentDate()}</span>
          </div>
          <div className="weather_right">
            <span className="weather_right_left">
              <img src={getWeatherImage()} alt={`날씨: ${sky}`} />
            </span>
            <div className="weather_right_right">
              <span className="currentTemp">{weatherData.TMP}°C</span>
              <span className="todayTemp">
                <span className="red">{weatherData.TMX}°</span>/
                <span className="blue">{weatherData.TMN}°</span>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div>날씨 정보를 불러오는 중입니다.</div>
      )}
    </div>
  );
};

export default Weather;
