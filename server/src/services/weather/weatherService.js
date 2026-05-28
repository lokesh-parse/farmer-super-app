async function getWeatherData(city) {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Weather API failed");
  }

  return {
    city: data.name,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    condition: data.weather[0].description,
    advice: generateFarmingAdvice(data.main.temp, data.main.humidity, data.weather[0].main),
  };
}

function generateFarmingAdvice(temp, humidity, condition) {
  if (condition === "Rain") {
    return "Rain expected. Avoid irrigation and pesticide spraying today.";
  }

  if (temp > 35) {
    return "High temperature. Irrigate early morning or evening.";
  }

  if (humidity > 80) {
    return "High humidity. Monitor crops for fungal disease.";
  }

  return "Weather is suitable for regular crop inspection.";
}

module.exports = { getWeatherData };