const express = require("express");
const cors = require("cors");

const farmRoutes = require("./routes/farmRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const cropDoctorRoutes = require("./routes/cropDoctorRoutes");
const marketRoutes = require("./routes/marketRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/farm-records", farmRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/crop-doctor", cropDoctorRoutes);
app.use("/api/market-prices", marketRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Farmer Super App API running" });
});

module.exports = app;