const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const recommendationRoutes = require(
  "./routes/recommendationRoutes"
);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/recommendations", recommendationRoutes);

// MongoDB connection disabled for demo version
console.log("Running with in-memory storage");

app.listen(5000, () => {
  console.log("Server running on port 5000");
});