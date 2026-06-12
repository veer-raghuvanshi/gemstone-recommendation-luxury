const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Recommendation');

// 1. GET ALL PAST RECOMMENDATIONS (HISTORY)
router.get('/', async (req, res) => {
  try {
    // Fetch records sorted by newest first
    const history = await Recommendation.find().sort({ date: -1 });
    res.json(history);
  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ error: err.message });
  }
});

// 2. CREATE NEW RECOMMENDATION
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, zodiacSign, profession, goal, dob, weight, placeOfBirth } = req.body;

    // Mapping rules for Gemstones to Rings/Fingers
    const gemstoneDetails = {
      "Ruby": { finger: "Ring Finger", hand: "Right Hand", metal: "Gold or Copper" },
      "Pearl": { finger: "Little Finger", hand: "Right Hand", metal: "Silver" },
      "Emerald": { finger: "Little Finger", hand: "Right Hand", metal: "Gold" },
      "Yellow Sapphire": { finger: "Index Finger", hand: "Right Hand", metal: "Gold" },
      "Diamond": { finger: "Middle or Little Finger", hand: "Right Hand", metal: "White Gold" },
      "Red Coral": { finger: "Ring Finger", hand: "Right Hand", metal: "Copper" },
      "Blue Sapphire": { finger: "Middle Finger", hand: "Right Hand", metal: "Panchdhatu" }
    };

    // Logical recommendation selector based on user input
    let selectedGemstones = ["Ruby", "Emerald"]; // Default fallback
    if (zodiacSign === "Cancer" || goal === "Health & Peace") {
      selectedGemstones = ["Pearl"];
    } else if (zodiacSign === "Aries" || goal === "Career Growth") {
      selectedGemstones = ["Ruby", "Red Coral"];
    } else if (zodiacSign === "Taurus" || zodiacSign === "Libra" || goal === "Wealth & Prosperity") {
      selectedGemstones = ["Diamond", "Emerald"];
    }

    // Weight to Carat formula (~1 carat per 12kg of body weight)
    const userWeight = Number(weight) || 60;
    const calculatedCarat = `${Math.max(3, Math.round(userWeight / 12))} to ${Math.max(4, Math.round(userWeight / 10))} Ratti`;

    // Package the recommendations nicely
    const richRecommendations = selectedGemstones.map(gem => ({
      gemstone: gem,
      finger: gemstoneDetails[gem]?.finger || "Ring Finger",
      hand: gemstoneDetails[gem]?.hand || "Right Hand",
      metal: gemstoneDetails[gem]?.metal || "Gold",
      suggestedCarat: calculatedCarat
    }));

    // Save everything to the updated database structure
    const newRec = new Recommendation({
      name,
      email,
      phone,
      zodiacSign,
      profession,
      goal,
      dob: dob || new Date(),
      weight: userWeight,
      placeOfBirth,
      recommendations: richRecommendations
    });

    await newRec.save();
    res.status(201).json(newRec);

  } catch (err) {
    console.error("Error creating recommendation:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;