export async function analyzeCropDisease(file) {
  const formData = new FormData();
  formData.append("cropImage", file);

  const res = await fetch("http://localhost:5000/api/crop-disease", {
    method: "POST",
    body: formData,
  });

  return res.json();
}