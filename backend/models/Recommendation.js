const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  zodiacSign: { type: String, required: true },
  profession: { type: String },
  goal: { type: String },
  dob: { type: Date, required: true },
  weight: { type: Number, required: true },
  placeOfBirth: { type: String, required: true },
  // Storing rich recommendation data
  recommendations: [
    {
      gemstone: String,
      finger: String,
      hand: String,
      metal: String,
      suggestedCarat: String
    }
  ],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);