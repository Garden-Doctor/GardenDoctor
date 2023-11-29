// weatherRoutes.js
const express = require("express");
const router = express.Router();
const weatherController = require("../controller/Cweather");

router.post("/", weatherController.weatherInfo);
router.post("/location", weatherController.locationInfo);

module.exports = router;
