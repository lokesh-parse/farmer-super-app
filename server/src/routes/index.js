const express = require("express");
const authRoutes = require("./authRoutes");
const chatRoutes = require("./chatRoutes");
const weatherRoutes = require("./weatherRoutes");
const cropDoctorRoutes = require("./cropDoctorRoutes");
const profileRoutes = require("./profileRoutes");
const farmRoutes = require("./farmRoutes");
const testRoutes = require("./testRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/chat", chatRoutes);
router.use("/weather", weatherRoutes);
router.use("/crop-doctor", cropDoctorRoutes);
router.use("/profile", profileRoutes);
router.use("/farm-records", farmRoutes);
router.use("/test", testRoutes);

module.exports = router;