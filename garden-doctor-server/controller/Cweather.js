const http = require("http");
const dotenv = require("dotenv");
const axios = require("axios");

const latLngToGrid = require("../modules/latLngToGrid");
const WEATHER_KEY = process.env.WEATHER_KEY;

dotenv.config();
function createUrl(pageNo, base_date, base_time, nx, ny) {
  return `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${WEATHER_KEY}&numOfRows=1000&pageNo=1&base_date=${base_date}&base_time=0500&nx=${nx}&ny=${ny}&dataType=JSON`;
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

    const weatherType = ["TMP", "POP", "PCP"];
    let weatherObj = {};

    const route = json.response.body.items.item;
    for (let i = 0; i < route.length; i++) {
      if (route[i].fcstDate === nowdate && route[i].fcstTime === time) {
        const category = route[i].category;
        if (weatherType.includes(category)) {
          weatherObj[category] = route[i].fcstValue;
        }
      }
    }

    return weatherObj;
  } catch (err) {
    return -1;
  }
}

// function extractWeatherInfoByDateTime(gametime, json) {
//   try {
//     var time = gametime.endsWith("30") ? gametime.slice(0, 2) + "00" : gametime;
//     const weatherType = ["TMP", "POP", "PCP", "fcstDate", "fcstTime"];
//     var weatherObj = {};

//     const route = json.response.body.items.item;
//     for (var i = 0; i < route.length; i++) {
//       if (route[i].fcstTime == time) {
//         weatherObj.fcstDate = route[i].fcstDate;
//         weatherObj.fcstTime = route[i].fcstTime;

//         const category = route[i].category;
//         if (weatherType.includes(category))
//           weatherObj[category] = route[i].fcstValue;
//       }
//     }
//     return weatherObj;
//   } catch (err) {
//     return -1;
//   }
// }

const weatherInfo = async (req, res) => {
  const { inputx, inputy } = req.body;
  try {
    const currentDateTime = new Date();

    // 현재 날짜
    const year = currentDateTime.getFullYear();
    const month = currentDateTime.getMonth() + 1;
    const day = currentDateTime.getDate();

    const nowdate = `${year}${month}${day}`;
    //현재 시간
    const hours = currentDateTime.getHours();

    const base_date = nowdate;
    const base_time = hours + "00";

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

module.exports = { weatherInfo };
