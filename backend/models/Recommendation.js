const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema({
  name: String,
  zodiac: String,
  profession: String,
  goal: String,
  recommendedGemstone: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



module.exports = mongoose.model(
  "Recommendation",
  recommendationSchema
);