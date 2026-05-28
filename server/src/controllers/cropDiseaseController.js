const { analyzeCropDisease } = require("../services/cropDisease/cropDiseaseService");

async function handleCropDisease(req, res) {
  const result = await analyzeCropDisease(req.file);
  res.json(result);
}

module.exports = { handleCropDisease };