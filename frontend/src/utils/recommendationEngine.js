import { gemstones } from "../data/gemstones";

export function getRecommendations(user) {
  const scoredGemstones = gemstones.map((gem) => {
    let score = 0;
    let reasons = [];

    if (gem.zodiac.includes(user.zodiac)) {
      score += 40;
      reasons.push(`Matches ${user.zodiac} zodiac`);
    }

    if (gem.goals.includes(user.goal)) {
      score += 30;
      reasons.push(`Supports ${user.goal}`);
    }

    if (gem.profession.includes(user.profession)) {
      score += 20;
      reasons.push(`Suitable for ${user.profession}`);
    }

    return {
      ...gem,
      score,
      reasons,
    };
  });

  return scoredGemstones.sort((a, b) => b.score - a.score);
}