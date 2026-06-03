const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");

router.get("/stats", async (req, res) => {
  const farmers = await supabase.from("farmer_profiles").select("*", { count: "exact", head: true });
  const records = await supabase.from("farm_records").select("*", { count: "exact", head: true });
  const posts = await supabase.from("community_posts").select("*", { count: "exact", head: true });
  const items = await supabase.from("marketplace_items").select("*", { count: "exact", head: true });

  res.json({
    farmers: farmers.count || 0,
    farmRecords: records.count || 0,
    communityPosts: posts.count || 0,
    marketplaceItems: items.count || 0,
  });
});

module.exports = router;