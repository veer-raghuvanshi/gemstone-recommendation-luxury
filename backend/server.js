const express = require("express");
const cors = require("cors");
require("dotenv").config();

const recommendationRoutes = require("./routes/recommendationRoutes");

const app = express();

/* =========================
   CORS CONFIG (IMPORTANT)
   ========================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend (Vite)
      "http://localhost:3000",
      "https://gemstone-recommendation-system.vercel.app" // your deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

/* =========================
   HEALTH CHECK ROUTE
   ========================= */
app.get("/", (req, res) => {
  res.json({
    status: "WORKING",
    message: "Backend deployed successfully 🚀"
  });
});

/* =========================
   API ROUTES
   ========================= */
app.use("/api/recommendations", recommendationRoutes);

/* =========================
   START SERVER
   ========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});