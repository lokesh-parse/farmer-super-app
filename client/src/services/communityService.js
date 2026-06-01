const API_URL = "http://localhost:5000/api/community";

export async function getCommunityPosts() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function createCommunityPost(postData) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  return await res.json();
}

export async function deleteCommunityPost(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return await res.json();
}