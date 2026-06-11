const express = require("express");
const cors = require("cors");
require("dotenv").config();

const recommendationRoutes = require("./routes/recommendationRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/* ✅ Home route (fixes "Cannot GET /") */
app.get("/", (req, res) => {
  res.json({
    status: "WORKING",
    message: "Backend deployed successfully 🚀"
  });
});

/* Routes */
app.use("/api/recommendations", recommendationRoutes);

/* Start server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});