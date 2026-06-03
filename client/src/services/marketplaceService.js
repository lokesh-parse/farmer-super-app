const API_URL = "http://localhost:5000/api/marketplace";

export async function getMarketplaceItems() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function createMarketplaceItem(formData) {
  const res = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  return await res.json();
}

export async function deleteMarketplaceItem(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return await res.json();
}