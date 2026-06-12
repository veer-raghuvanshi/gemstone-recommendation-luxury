import { useState, useEffect } from "react";
import RecommendationCard from "./components/RecommendationCard";
import UserForm from "./components/UserForm";
import { getRecommendations } from "./utils/recommendationEngine";

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [history, setHistory] = useState([]);

  const API_BASE = import.meta.env.VITE_API_URL;

  const fetchHistory = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/recommendations`);
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleRecommendation = async (userData) => {
    const results = getRecommendations(userData);
    const topResults = results.slice(0, 3);

    setRecommendations(topResults);

    await fetch(`${API_BASE}/api/recommendations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userData,
        recommendations: topResults,
      }),
    });

    fetchHistory();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">
        💎 Gemstone Recommendation System
      </h1>

      <UserForm onSubmit={handleRecommendation} />

      {recommendations.map((g, i) => (
        <RecommendationCard key={i} gemstone={g} rank={i} />
      ))}
    </div>
  );
}

export default App;