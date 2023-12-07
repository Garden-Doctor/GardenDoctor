import React, { useState, useEffect } from "react";
import { Radio } from "react-loader-spinner";
import axios from "axios";
import manyclouds from "../../images/구름많음.svg";
import cloudy from "../../images/cloudy.svg";
import rainy from "../../images/rainy.svg";
import sunny from "../../images/sunny.svg";
import location_src from "../../images/location.svg";

const Weather2 = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(null);
  const [location, setLocation] = useState(null);
  const [sky, setSky] = useState(null);
  //////////////////////////////////////////////////////
  const [temp, setTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [tempDesc, setTempDesc] = useState("");
  const [iconNum, setIconNum] = useState("");
  //아이콘 png 불러다가 쓰는법 - 이 url을 이용한다.
  // https://openweathermap.org/img/wn/${iconNum}@2x.png

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
      const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
      getWeather(
        currentLocation.latitude,
        currentLocation.longitude,
        weatherApiKey
      );
      fetchLocationData();
    }
  }, [currentLocation]);

  const getWeather = async (lat, lon, api) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&lang=kr&units=metric
        `
      );
      setTemp(parseInt(res.data.main.temp, 10));
      setMaxTemp(parseInt(res.data.main.temp_max, 10));
      setMinTemp(parseInt(res.data.main.temp_min, 10));
      setTempDesc(res.data.weather[0].description);
      setIconNum(res.data.weather[0].icon);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLocationData = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/weather/location`,
        {
          lat: currentLocation.latitude,
          lng: currentLocation.longitude,
        }
      );
      const locationData = res.data;
      setLocation(locationData);
    } catch (error) {
      console.error(error);
    }
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

  return (
    <div className="weather-container">
      {location ? (
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
              <img
                src={`https://openweathermap.org/img/wn/${iconNum}@2x.png`}
                alt={`날씨: ${sky}`}
              />
            </span>
            <div className="weather_right_right">
              <span className="currentTemp">{temp}°C</span>
              <span className="todayTemp">
                <span className="red">{maxTemp}°</span>/
                <span className="blue">{minTemp}°</span>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="weather-container-inner">
          <Radio
            visible={true}
            height="80"
            width="80"
            ariaLabel="radio-loading"
            wrapperStyle={{}}
            wrapperClass="radio-wrapper"
            colors={["#51E5FF", "#7DE2D1", "#FF7E6B"]}
          />
          날씨 정보를 불러오는 중입니다.
        </div>
      )}
    </div>
  );
};

export default Weather2;
