const express = require("express");
const router = express.Router();
const controller = require("../controller/CPlants");

router.post("/", controller.addPlant);

module.exports = router;
