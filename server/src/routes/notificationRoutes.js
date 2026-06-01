const express = require("express");
const router = express.Router();

const notifications = [
  {
    id: 1,
    type: "weather",
    message: "Heavy rain expected tomorrow. Avoid irrigation.",
    time: "Today",
  },
  {
    id: 2,
    type: "market",
    message: "Wheat price increased by ₹150 per quintal.",
    time: "2 hours ago",
  },
  {
    id: 3,
    type: "crop",
    message: "Check your crop for pest infection this week.",
    time: "Yesterday",
  },
];

router.get("/", (req, res) => {
  res.json(notifications);
});

module.exports = router;