const express = require("express");

const router = express.Router();

const marketPrices = [
  {
    id: 1,
    crop: "Wheat",
    market: "Nagpur Mandi",
    state: "Maharashtra",
    minPrice: 2100,
    maxPrice: 2400,
    modalPrice: 2250,
    unit: "quintal",
  },
  {
    id: 2,
    crop: "Cotton",
    market: "Akola Mandi",
    state: "Maharashtra",
    minPrice: 6800,
    maxPrice: 7400,
    modalPrice: 7100,
    unit: "quintal",
  },
  {
    id: 3,
    crop: "Soybean",
    market: "Amravati Mandi",
    state: "Maharashtra",
    minPrice: 3900,
    maxPrice: 4300,
    modalPrice: 4100,
    unit: "quintal",
  },
  {
    id: 4,
    crop: "Tomato",
    market: "Pune Market",
    state: "Maharashtra",
    minPrice: 800,
    maxPrice: 1200,
    modalPrice: 1000,
    unit: "quintal",
  },
];

router.get("/", (req, res) => {
  const { crop, state } = req.query;

  let result = marketPrices;

  if (crop) {
    result = result.filter((item) =>
      item.crop.toLowerCase().includes(crop.toLowerCase())
    );
  }

  if (state) {
    result = result.filter((item) =>
      item.state.toLowerCase().includes(state.toLowerCase())
    );
  }

  res.json(result);
});

module.exports = router;