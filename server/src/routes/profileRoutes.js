const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");

router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("farmer_profiles")
    .select("*")
    .limit(1);

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json(data[0] || {});
});

router.put("/", async (req, res) => {
  const { name, phone, village, district, state, landSize, mainCrop } = req.body;

  const { data: existing } = await supabase
    .from("farmer_profiles")
    .select("*")
    .limit(1);

  if (existing && existing.length > 0) {
    const { data, error } = await supabase
      .from("farmer_profiles")
      .update({
        name,
        phone,
        village,
        district,
        state,
        land_size: landSize,
        main_crop: mainCrop,
      })
      .eq("id", existing[0].id)
      .select()
      .single();

    if (error) return res.status(500).json({ message: error.message });

    return res.json(data);
  }

  const { data, error } = await supabase
    .from("farmer_profiles")
    .insert([
      {
        name,
        phone,
        village,
        district,
        state,
        land_size: landSize,
        main_crop: mainCrop,
      },
    ])
    .select()
    .single();

  if (error) return res.status(500).json({ message: error.message });

  res.json(data);
});

module.exports = router;