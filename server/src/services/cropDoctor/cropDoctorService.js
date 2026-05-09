function getCropDiagnosis(file) {
  return {
    success: true,
    imageUrl: file ? `http://localhost:5000/uploads/${file.filename}` : null,
    disease: "Leaf Spot (Dummy Result)",
    confidence: "92%",
    advice: [
      "Remove infected leaves",
      "Avoid overwatering",
      "Use a recommended fungicide after expert confirmation",
    ],
  };
}

module.exports = { getCropDiagnosis };