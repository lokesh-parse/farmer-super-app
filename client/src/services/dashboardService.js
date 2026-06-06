const API_URL = "http://localhost:5000/api/dashboard";

export async function getDashboardStats() {
  const res = await fetch(`${API_URL}/stats`);
  return await res.json();
}