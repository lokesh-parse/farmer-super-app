const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const farmRoutes = require("./routes/farmRoutes");
const cropDiseaseRoutes = require("./routes/cropDiseaseRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/farm-records", farmRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Farmer Super App API running" });
});

app.use("/api", routes);
app.use("/api/crop-disease", cropDiseaseRoutes);

module.exports = app;