const { getWeatherData } = require("../services/weather/weatherService");

function handleWeather(req, res) {
  const { location } = req.body;

  const result = getWeatherData(location || "");

  res.json(result);
}

module.exports = { handleWeather };