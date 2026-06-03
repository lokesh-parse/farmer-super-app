const API_URL = "http://localhost:5000/api/admin";

export async function getAdminStats() {
  const res = await fetch(`${API_URL}/stats`);
  return await res.json();
}