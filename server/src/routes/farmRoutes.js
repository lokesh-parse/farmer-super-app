const express = require("express");
const router = express.Router();

let farmRecords = []; // temp in-memory storage

// GET all records
router.get("/", (req, res) => {
  res.json(farmRecords);
});

// POST new record
router.post("/", (req, res) => {
  const newRecord = {
    id: Date.now(),
    ...req.body,
  };

  farmRecords.unshift(newRecord);
  res.json(newRecord);
});

module.exports = router;