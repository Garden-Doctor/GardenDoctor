const express = require("express");
const router = express.Router();
const controller = require("../controller/CPlants");

router.post("/", controller.myPlants);
router.post("/addPlant", controller.addPlant);
router.post("/plantDetail", controller.plantDetail);



module.exports = router;
