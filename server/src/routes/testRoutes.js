const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");

router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("test")
    .select("id, text, created_at");

  if (error) {
    return res.json({
      success: false,
      error: error.message,
    });
  }

  res.json({
    success: true,
    data,
  });
});

router.get("/insert", async (req, res) => {
  const { data, error } = await supabase
    .from("test")
    .insert([{ text: "farmer from backend" }])
    .select();

  if (error) {
    return res.json({
      success: false,
      error: error.message,
    });
  }

  res.json({
    success: true,
    data,
  });
});

module.exports = router;