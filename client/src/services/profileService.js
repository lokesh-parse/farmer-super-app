const API_URL = "http://localhost:5000/api/profile";

export async function getProfile() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function saveProfile(profileData) {
  const res = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });

  return await res.json();
}