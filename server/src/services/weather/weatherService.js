function getWeatherData(location) {
  return {
    location: location || "Unknown",
    temperature: "32°C",
    condition: "Sunny",
    humidity: "48%",
    wind: "12 km/h",
    advice:
      "Weather is clear. This is a good time for irrigation planning and crop inspection.",
  };
}

module.exports = { getWeatherData };