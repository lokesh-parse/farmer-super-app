const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");

router.get("/stats", async (req, res) => {
  const farmers = await supabase
    .from("farmer_profiles")
    .select("*", { count: "exact", head: true });

  const farmRecords = await supabase
    .from("farm_records")
    .select("*", { count: "exact", head: true });

  const communityPosts = await supabase
    .from("community_posts")
    .select("*", { count: "exact", head: true });

  const marketplaceItems = await supabase
    .from("marketplace_items")
    .select("*", { count: "exact", head: true });

  const recommendations = await supabase
    .from("farmer_recommendations")
    .select("*", { count: "exact", head: true });

  res.json({
    farmers: farmers.count || 0,
    farmRecords: farmRecords.count || 0,
    communityPosts: communityPosts.count || 0,
    marketplaceItems: marketplaceItems.count || 0,
    recommendations: recommendations.count || 0,
  });
});

module.exports = router;