function RecommendationCard({ gemstone, rank }) {
  if (!gemstone) return null;

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-indigo-500 transition">

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">
          {medals[rank]} 💎 {gemstone.name}
        </h2>

        <span className="bg-indigo-600 px-3 py-1 rounded-full text-sm">
          Score: {gemstone.score}
        </span>
      </div>

      <h3 className="font-semibold mb-2">
        Why Recommended?
      </h3>

      <ul className="list-disc ml-5 mb-4 text-slate-300">
        {gemstone.reasons.map((reason) => (
          <li key={reason}>{reason}</li>
        ))}
      </ul>

      <h3 className="font-semibold mb-2">
        Benefits
      </h3>

      <ul className="list-disc ml-5 text-slate-300">
        {gemstone.benefits.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>

    </div>
  );
}

export default RecommendationCard;