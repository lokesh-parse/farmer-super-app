const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");

// GET all farm records
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

// POST a new farm record
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

// PUT update farm record
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { cropName, landSize, season, expense, expectedYield } = req.body;

  const { data, error } = await supabase
    .from("farm_records")
    .update({
      crop_name: cropName,
      land_size: landSize,
      season,
      expense,
      expected_yield: expectedYield,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  res.json(data);
});

// DELETE farm record
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("farm_records")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  res.json({
    success: true,
    message: "Record deleted successfully",
  });
});

module.exports = router;