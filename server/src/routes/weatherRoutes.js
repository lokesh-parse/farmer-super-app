const express = require("express");
const router = express.Router();
const { handleWeather } = require("../controllers/weatherController");

router.post("/", handleWeather);

module.exports = router;