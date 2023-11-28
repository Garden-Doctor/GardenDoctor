const http = require("http");
const dotenv = require("dotenv");
const axios = require("axios");

const latLngToGrid = require("../modules/latLngToGrid");
const { log } = require("console");
const WEATHER_KEY = process.env.REACT_APP_WEATHER_KEY;
const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;

dotenv.config();
function createUrl(pageNo, base_date, base_time, nx, ny) {
  console.log("bast_time", base_time);
  return `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${WEATHER_KEY}&numOfRows=1000&pageNo=1&base_date=${base_date}&base_time=0200&nx=${nx}&ny=${ny}&dataType=JSON`;
}

function getNearestBaseTime() {
  // 최저 기온을 안가지고 와서 그냥 전날을 기준으로 잡아버림
  // 기준 시간대 정의
  const baseTimes = [200, 500, 800, 1100, 1400, 1700, 2000, 2300];

  // 현재 시간 구하기
  const currentTime = new Date();

  // 현재 시간을 분 단위로 변환
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  // 기준 시간대를 분 단위로 변환하여 비교
  const baseTimesMinutes = baseTimes.map(
    (baseTime) => Math.floor(baseTime / 100) * 60 + (baseTime % 100)
  );

  // 현재 시간에서 가장 가까운 이전 시간대 찾기
  let nearestBaseTime = Math.max(
    ...baseTimesMinutes.filter((time) => time <= currentMinutes)
  );

  // 현재 분이 10분 이상이라면 더 이전 시간대 선택
  if (currentTime.getMinutes() >= 10) {
    const index = baseTimesMinutes.indexOf(nearestBaseTime);
    nearestBaseTime = baseTimesMinutes[index - 1];
  }

  // 선택된 시간대를 시간과 분으로 변환
  const nearestBaseTimeHour = Math.floor(nearestBaseTime / 60);
  const nearestBaseTimeMinute = nearestBaseTime % 60;

  // 선택된 시간대 출력
  return `${nearestBaseTimeHour
    .toString()
    .padStart(2, "0")}${nearestBaseTimeMinute.toString().padStart(2, "0")}`;
}

function extractWeatherInfoByDateTime(currentDateTime, json) {
  try {
    // 현재 날짜
    const year = currentDateTime.getFullYear();
    const month = currentDateTime.getMonth() + 1;
    const day = currentDateTime.getDate();

    const nowdate = `${year}${month}${day}`;
    // 현재 시간
    const hours = currentDateTime.getHours();

    // 현재 시간을 기준으로 필터링할 시간
    const time = (hours < 10 ? "0" : "") + hours + "00";

    const weatherType = [
      "TMP",
      "POP",
      "PCP",
      "PTY",
      "TMN",
      "TMX",
      "SKY",
      "fcstDate",
      "fcstTime",
    ];
    let weatherObj = {};

    const route = json.response.body.items.item;
    for (let i = 0; i < route.length; i++) {
      if (route[i].fcstDate === nowdate) {
        const category = route[i].category;
        if (weatherType.includes(category)) {
          weatherObj[category] = route[i].fcstValue;
        }
      }
    }
    console.log("weatherObj", weatherObj);

    return weatherObj;
  } catch (err) {
    return -1;
  }
}

const weatherInfo = async (req, res) => {
  const { inputx, inputy } = req.body;
  try {
    const currentDateTime = new Date();

    // 현재 날짜
    const year = currentDateTime.getFullYear();
    const month = currentDateTime.getMonth() + 1;
    const day = currentDateTime.getDate();

    const nowdate = `${year}${month}${day}`;

    const base_date = nowdate;
    const base_time = getNearestBaseTime();

    const nx = latLngToGrid(inputx, inputy).x;
    const ny = latLngToGrid(inputx, inputy).y;

    const pageNo = 1; // 페이지 번호

    const url = createUrl(pageNo, base_date, base_time, nx, ny);

    // API 요청을 보내기
    const response = await axios.get(url);

    const extractedWeatherInfo = extractWeatherInfoByDateTime(
      currentDateTime,
      response.data
    );
    res.send(extractedWeatherInfo);
    // res.send(response.data);
    // console.log(response.data.response.body.items.item);
  } catch (error) {
    console.log(error);
  }
};

const locationInfo = async (req, res) => {
  const { lat, lng } = req.body;

  console.log("위도경도", lat, lng);

  try {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lng}&y=${lat}`,
      {
        headers: {
          Authorization: `KakaoAK ${REST_API_KEY}`,
        },
      }
    );
    console.log("주소", response.data.documents[0].address_name);
    res.json(response.data.documents[0].address_name);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to convert location" });
  }
};

module.exports = { weatherInfo, locationInfo };
