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

// LIKE / UNLIKE Post
router.post("/:id/like", async (req, res) => {
  const { id } = req.params;
  const { user_name } = req.body;

  const { data: existingLike } = await supabase
    .from("community_likes")
    .select("*")
    .eq("post_id", id)
    .eq("user_name", user_name)
    .limit(1);

  if (existingLike && existingLike.length > 0) {
    const { error } = await supabase
      .from("community_likes")
      .delete()
      .eq("id", existingLike[0].id);

    if (error) return res.status(500).json({ message: error.message });

    return res.json({
      liked: false,
      message: "Like removed",
    });
  }

  const { data, error } = await supabase
    .from("community_likes")
    .insert([
      {
        post_id: id,
        user_name,
      },
    ])
    .select()
    .single();

  if (error) return res.status(500).json({ message: error.message });

  res.json({
    liked: true,
    data,
  });
});

// GET Likes Count
router.get("/:id/likes", async (req, res) => {
  const { id } = req.params;

  const { count, error } = await supabase
    .from("community_likes")
    .select("*", { count: "exact", head: true })
    .eq("post_id", id);

  if (error) return res.status(500).json({ message: error.message });

  res.json({ count });
});

// ADD Comment
router.post("/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { user_name, comment } = req.body;

  const { data, error } = await supabase
    .from("community_comments")
    .insert([
      {
        post_id: id,
        user_name,
        comment,
      },
    ])
    .select()
    .single();

  if (error) return res.status(500).json({ message: error.message });

  res.json(data);
});

// GET Comments
router.get("/:id/comments", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("community_comments")
    .select("*")
    .eq("post_id", id)
    .order("created_at", { ascending: true });

  if (error) return res.status(500).json({ message: error.message });

  res.json(data);
});

module.exports = router;