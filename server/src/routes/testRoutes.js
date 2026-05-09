const express = require("express");
const router = express.Router();

const supabase = require("../config/supabase");

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("test")
      .select("*");

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
  } catch (err) {
    res.json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;