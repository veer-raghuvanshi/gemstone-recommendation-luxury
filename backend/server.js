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
      "http://localhost:5173",
      "http://localhost:3000",
      "https://gemstone-recommendation-system.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
  })
);

app.options("*", cors());

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