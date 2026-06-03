const express = require("express");
const multer = require("multer");
const router = express.Router();
const supabase = require("../config/supabase");

// Configure multer to store files in memory before uploading to Supabase
const upload = multer({ storage: multer.memoryStorage() });

// GET all products
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("marketplace_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json(data);
});

// CREATE product with image upload
router.post("/", upload.single("image"), async (req, res) => {
  const { product_name, quantity, price, location, contact } = req.body;

  let imageUrl = "";

  // Handle image upload if a file is included in the request
  if (req.file) {
    const fileName = `${Date.now()}-${req.file.originalname}`;

    const { error: uploadError } = await supabase.storage
      .from("marketplace-images")
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });

    if (uploadError) {
      return res.status(500).json({ message: uploadError.message });
    }

    const { data: publicUrlData } = supabase.storage
      .from("marketplace-images")
      .getPublicUrl(fileName);

    imageUrl = publicUrlData.publicUrl;
  }

  // Insert the product data along with the generated image URL
  const { data, error } = await supabase
    .from("marketplace_items")
    .insert([
      {
        product_name,
        quantity,
        price,
        location,
        contact,
        image_url: imageUrl,
      },
    ])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json(data);
});

// DELETE product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("marketplace_items")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json({ success: true });
});

module.exports = router;