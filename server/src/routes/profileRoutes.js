const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ module: "profile route working" });
});

module.exports = router;