import { useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import { getRecommendations } from "./utils/recommendationEngine";

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [history, setHistory] = useState([]);

  const API_BASE = import.meta.env.VITE_API_URL;

  // ✅ FETCH HISTORY
  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/recommendations`);
      const data = await res.json();
      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("History error:", err);
    }
  };

  // ✅ LOAD HISTORY ON PAGE LOAD
  useEffect(() => {
    fetchHistory();
  }, []);

  // ✅ HANDLE RECOMMENDATION + SAVE TO BACKEND
  const handleRecommendation = async (userData) => {
    const results = getRecommendations(userData);
    const topResults = Array.isArray(results) ? results.slice(0, 3) : [];

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

      // ✅ refresh history after saving
      await fetchHistory();
    } catch (err) {
      console.log("POST error:", err);
    }
  };

  return (
    <div className="page">

      {/* HEADER */}
      <div className="top-text">

        <div className="title-row">
          <span className="icon">💎</span>
          <h1>Gemstone Recommendation System</h1>
        </div>

        <p>
          Get personalized gemstone recommendations based on zodiac, profession, and goals.
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="card">

        <UserForm onSubmit={handleRecommendation} />

        {/* CURRENT RESULTS */}
        {recommendations.length > 0 && (
          <div className="results">

            <h2>Top Recommendations</h2>

            {recommendations.map((gem, index) => (
              <div key={gem.name} className="result-card">

                {/* HEADER ROW */}
                <div className="card-header">

                  <h3>
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"} 💎 {gem.name}
                  </h3>

                  <div className="score-badge">
                    Score: {gem.score ?? 0}
                  </div>

                </div>

                {/* BULLETS */}
                <ul className="report-list">

                  <li><b>Why Recommended:</b></li>

                  {(Array.isArray(gem.reasons) ? gem.reasons : ["N/A"]).map((r, i) => (
                    <li key={i}>• {r}</li>
                  ))}

                  <li><b>Benefits:</b></li>
                  <li>• Calmness</li>
                  <li>• Emotional Balance</li>
                  <li>• Growth</li>

                </ul>

              </div>
            ))}
          </div>
        )}

        {/* HISTORY SECTION */}
        {history.length > 0 && (
          <div className="history">

            <h2>History</h2>

            {history.map((item, index) => (
              <div key={index} className="history-card">

                <p>
                  <b>Date:</b>{" "}
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString()
                    : "No Date"}
                </p>

                <p>
                  <b>Recommendations:</b>{" "}
                  {item.recommendations?.map((r) => r.name).join(", ")}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default App;