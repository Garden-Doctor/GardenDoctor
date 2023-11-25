// weatherRoutes.js
const express = require("express");
const router = express.Router();
const weatherController = require("../controller/Cweather");

router.post("/", weatherController.weatherInfo);

module.exports = router;
