const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // This loads your hidden safe keys from the .env file

const recommendationRoutes = require('./routes/recommendationRoutes');

const app = express();

// 1. Middleware Configurations
app.use(cors());
app.use(express.json());

// 2. Base Server Check Route
app.get('/', (req, res) => {
  res.send('💎 Gemstone Astrological Backend Server is Live and Active!');
});

// 3. Register Application Routes
app.use('/api/recommendations', recommendationRoutes);

// 4. Live MongoDB Atlas Database Connection
// This line now safely pulls your secret URL from the hidden .env file
const MONGO_URI = process.env.MONGO_URI;

console.log('Attempting to connect to MongoDB Atlas Cloud...');
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Atlas Cloud Connected Successfully!');
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Error Details:', err.message);
  });

// 5. Start Server Listening on Port 5001 (Bypassing Apple AirPlay Port 5000 Hold)
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server is officially holding open and running on port ${PORT}`);
});