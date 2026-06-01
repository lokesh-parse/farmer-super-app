const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");

// GET Posts
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("community_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json(data);
});

// CREATE Post
router.post("/", async (req, res) => {
  const { author_name, content } = req.body;

  const { data, error } = await supabase
    .from("community_posts")
    .insert([
      {
        author_name,
        content,
      },
    ])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json(data);
});

// DELETE Post
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("community_posts")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json({
    success: true,
  });
});

module.exports = router;