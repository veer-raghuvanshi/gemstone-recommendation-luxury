import { useState, useEffect } from "react";
import RecommendationCard from "./components/RecommendationCard";
import UserForm from "./components/UserForm";
import { getRecommendations } from "./utils/recommendationEngine";


function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [history, setHistory] = useState([]);

  const API_BASE = import.meta.env.VITE_API_URL;

  // ✅ FETCH HISTORY
  const fetchHistory = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/recommendations`);

      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  // ✅ LOAD HISTORY ON PAGE LOAD
  useEffect(() => {
    fetchHistory();
  }, []);

  // ✅ HANDLE RECOMMENDATION
  const handleRecommendation = async (userData) => {
    const results = getRecommendations(userData);
    const topResults = results.slice(0, 3);

    setRecommendations(topResults);

    try {
      await fetch(`${API_BASE}/api/recommendations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userData,
          recommendations: topResults,
        }),
      });

      console.log("Recommendation saved");

      await fetchHistory();
    } catch (error) {
      console.error("Failed to save recommendation", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            💎 Gemstone Recommendation System
          </h1>

          <p className="text-slate-400 text-lg">
            Get personalized gemstone recommendations based on your
            zodiac sign, profession, and goals.
          </p>
        </div>

        {/* Form */}
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
          <h2 className="text-2xl font-semibold mb-6">
            Get Your Recommendation
          </h2>

          <UserForm onSubmit={handleRecommendation} />
        </div>

        {/* Results */}
        {recommendations.length > 0 && (
          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-6">
              Top Recommendations
            </h2>

            <div className="space-y-4">
              {recommendations.map((gem, index) => (
                <RecommendationCard
                  key={gem.name}
                  gemstone={gem}
                  rank={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* HISTORY SECTION */}
        {history.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-6">
              Recommendation History
            </h2>

            <div className="space-y-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900 border border-slate-800 p-4 rounded-xl"
                >
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(item.createdAt).toLocaleString()}
                  </p>

                  <p>
                    <strong>Recommendations:</strong>{" "}
                    {item.recommendations
                      ?.map((g) => g.name)
                      .join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;