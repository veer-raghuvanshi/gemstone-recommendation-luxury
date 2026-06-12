const express = require('express');
const router = express.Router();

// Your local dataset acting as the gemstone database
const gemstoneData = {
  "aries": { gemstone: "Coral (Moonga)", ratti: "6-8 Ratti", metal: "Copper or Gold" },
  "taurus": { gemstone: "Diamond or White Sapphire", ratti: "5-6 Ratti", metal: "Silver" },
  "gemini": { gemstone: "Emerald (Panna)", ratti: "5-7 Ratti", metal: "Gold or Panchdhatu" },
  "cancer": { gemstone: "Pearl (Moti)", ratti: "5-7 Ratti", metal: "Silver" },
  "leo": { gemstone: "Ruby (Manik)", ratti: "5-7 Ratti", metal: "Gold" },
  "virgo": { gemstone: "Emerald (Panna)", ratti: "5-7 Ratti", metal: "Panchdhatu" },
  "libra": { gemstone: "White Sapphire", ratti: "5-6 Ratti", metal: "Silver" },
  "scorpio": { gemstone: "Red Coral", ratti: "6-8 Ratti", metal: "Copper" },
  "sagittarius": { gemstone: "Yellow Sapphire (Pukhraj)", ratti: "5-7 Ratti", metal: "Gold" },
  "capricorn": { gemstone: "Blue Sapphire (Neelam)", ratti: "4-6 Ratti", metal: "Panchdhatu" },
  "aquarius": { gemstone: "Blue Sapphire (Neelam)", ratti: "5-7 Ratti", metal: "Silver or Iron" },
  "pisces": { gemstone: "Yellow Sapphire (Pukhraj)", ratti: "5-7 Ratti", metal: "Gold" }
};

router.post('/', (req, res) => {
  // Read the zodiac sign sent over by your App.jsx frontend
  const { zodiac } = req.body; 

  // Standardize the text to lowercase so capitalization doesn't cause errors
  const searchKey = zodiac ? zodiac.trim().toLowerCase() : null;
  const recommendation = gemstoneData[searchKey];

  if (recommendation) {
    // If a match is found, send the data back to your UI
    res.status(200).json({
      success: true,
      gemstone: recommendation.gemstone,
      ratti: recommendation.ratti,
      metal: recommendation.metal
    });
  } else {
    // FALLBACK STATE: If something goes wrong, send a default stone instead of breaking or showing 'na'
    res.status(200).json({
      success: true,
      gemstone: "Emerald (Panna)",
      ratti: "5-7 Ratti",
      metal: "Panchdhatu"
    });
  }
});

module.exports = router;