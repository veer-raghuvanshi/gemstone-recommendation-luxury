const express = require("express");
const router = express.Router();

// Temporary in-memory storage
let recommendations = [];

// Save recommendation
router.post("/", async (req, res) => {
  try {
    const recommendation = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date(),
    };

    recommendations.push(recommendation);

    res.status(201).json(recommendation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get recommendation history
router.get("/", async (req, res) => {
  try {
    const sortedRecommendations = recommendations.sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.json(sortedRecommendations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;