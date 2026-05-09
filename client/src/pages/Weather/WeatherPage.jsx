import { useState } from "react";
import { getWeather } from "../../services/weatherService";
import { addHistoryItem } from "../../utils/history";
import PageHeader from "../../components/common/PageHeader"; // <-- New Import added here

function WeatherPage() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckWeather = async () => {
    if (!location.trim() || loading) return;

    setLoading(true);

    try {
      const data = await getWeather(location);
      setWeather(data);
      addHistoryItem({
        type: "Weather",
        detail: `${location} weather checked`,
        time: new Date().toLocaleString(),
      });
    } catch (error) {
      setWeather({
        location: location,
        temperature: "--",
        condition: "Error",
        humidity: "--",
        wind: "--",
        advice: "Could not connect to weather server.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-page">
      {/* Updated Header Component */}
      <PageHeader
        title="Weather Advisor"
        subtitle="Check location weather and get simple farming advice."
      />

      <div className="weather-search">
        <input
          type="text"
          placeholder="Enter city or village"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleCheckWeather} disabled={loading}>
          {loading ? "Checking..." : "Check Weather"}
        </button>
      </div>

      {weather && (
        <div className="weather-card">
          <h2>{weather.location}</h2>
          <div className="weather-grid">
            <div className="weather-item">
              <span>Temperature</span>
              <strong>{weather.temperature}</strong>
            </div>
            <div className="weather-item">
              <span>Condition</span>
              <strong>{weather.condition}</strong>
            </div>
            <div className="weather-item">
              <span>Humidity</span>
              <strong>{weather.humidity}</strong>
            </div>
            <div className="weather-item">
              <span>Wind</span>
              <strong>{weather.wind}</strong>
            </div>
          </div>

          <div className="weather-advice">
            <h3>Farming Advice</h3>
            <p>{weather.advice}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherPage;