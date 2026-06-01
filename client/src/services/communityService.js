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

export async function likeCommunityPost(id, userName) {
  const res = await fetch(`${API_URL}/${id}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_name: userName }),
  });

  return await res.json();
}

export async function getPostLikes(id) {
  const res = await fetch(`${API_URL}/${id}/likes`);
  return await res.json();
}

export async function addPostComment(id, userName, comment) {
  const res = await fetch(`${API_URL}/${id}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_name: userName,
      comment,
    }),
  });

  return await res.json();
}

export async function getPostComments(id) {
  const res = await fetch(`${API_URL}/${id}/comments`);
  return await res.json();
}