const express = require("express");
const cors = require("cors");

const farmRoutes = require("./routes/farmRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const cropDoctorRoutes = require("./routes/cropDoctorRoutes");
const marketRoutes = require("./routes/marketRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const profileRoutes = require("./routes/profileRoutes");
const communityRoutes = require("./routes/communityRoutes");
const marketplaceRoutes = require("./routes/marketplaceRoutes");
const adminRoutes = require("./routes/adminRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const cropAdvisoryRoutes = require("./routes/cropAdvisoryRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/farm-records", farmRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/crop-doctor", cropDoctorRoutes);
app.use("/api/market-prices", marketRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/crop-advisory", cropAdvisoryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/chat", chatRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Farmer Super App API running" });
});

module.exports = app;