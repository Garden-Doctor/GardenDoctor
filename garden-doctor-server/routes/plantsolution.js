const express = require("express");
const router = express.Router();
const controller = require("../controller/CPlantsolution");

router.post("/", controller.getSolutions);

module.exports = router;
