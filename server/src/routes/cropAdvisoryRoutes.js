const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { cropName, season, problem, location } = req.body;

  const advice = {
    cropName,
    season,
    location,
    problem,
    possibleReason: `Based on ${cropName} crop, this problem may be due to pest attack, weather stress, nutrient deficiency, or poor irrigation management.`,
    solution: [
      `Inspect ${cropName} leaves, stem, and soil condition.`,
      "Avoid overwatering and improve drainage.",
      "Use balanced fertilizer based on soil condition.",
      "Use pesticide/fungicide only after expert confirmation.",
    ],
    precautions: [
      "Check crop every 3-4 days.",
      "Follow local weather alerts.",
      "Keep proper plant spacing.",
      "Remove infected leaves if disease spreads.",
    ],
    note: "This is AI-assisted advisory. Confirm with local agriculture expert before chemical use.",
  };

  res.json(advice);
});

module.exports = router;