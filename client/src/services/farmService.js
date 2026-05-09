export async function getFarmRecords() {
  const res = await fetch("http://localhost:5000/api/farm-records");
  return res.json();
}

export async function addFarmRecord(data) {
  const res = await fetch("http://localhost:5000/api/farm-records", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}