const API_URL = "http://localhost:5000/api/recommendations";

export async function getRecommendations() {
  const res = await fetch(API_URL);
  return await res.json();
}