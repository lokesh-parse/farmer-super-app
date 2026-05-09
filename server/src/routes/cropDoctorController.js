const { getCropDiagnosis } = require("../services/cropDoctor/cropDoctorService");

function handleCropDiagnosis(req, res) {
  const result = getCropDiagnosis(req.file);
  res.json(result);
}

module.exports = { handleCropDiagnosis };