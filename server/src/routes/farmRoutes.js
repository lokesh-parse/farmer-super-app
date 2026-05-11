const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");

router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("farm_records")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("GET ERROR:", error);
    return res.status(500).json({ message: error.message });
  }

  res.json(data);
});

router.post("/", async (req, res) => {
  console.log("BODY RECEIVED:", req.body);

  const { cropName, landSize, season, expense, expectedYield } = req.body;

  const { data, error } = await supabase
    .from("farm_records")
    .insert([
      {
        crop_name: cropName,
        land_size: landSize,
        season: season,
        expense: expense,
        expected_yield: expectedYield,
      },
    ])
    .select()
    .single();

  if (error) {
    console.log("POST ERROR:", error);
    return res.status(500).json({ message: error.message });
  }

  console.log("SAVED DATA:", data);
  res.json(data);
});

module.exports = router;