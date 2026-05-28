const { getWeatherData } = require("../services/weather/weatherService");

async function handleWeather(req, res) {
  const { location } = req.body;

  try {
    const result = await getWeatherData(location);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = { handleWeather };