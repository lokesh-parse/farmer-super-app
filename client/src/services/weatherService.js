export async function getWeather(location) {
  const res = await fetch("http://localhost:5000/api/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ location }),
  });

  return res.json();
}