export async function deleteFarmRecord(id) {
  const res = await fetch(
    `http://localhost:5000/api/farm-records/${id}`,
    {
      method: "DELETE",
    }
  );

  return res.json();
}