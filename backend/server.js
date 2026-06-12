const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const recommendationRoutes = require('./routes/recommendationRoutes');

const app = express();

// 1. Middleware Configuration
app.use(cors());
app.use(express.json());

// 2. Base Server Check Route
app.get('/', (req, res) => {
  res.send('💎 Gemstone Astrological Backend Server is Live and Active!');
});

// 3. Register Application Routes
app.use('/api/recommendations', recommendationRoutes);

// 4. Live MongoDB Atlas Database Connection
const MONGO_URI = "mongodb+srv://yashita2578beai24_db_user:Mongo123@gemstone-cluster.qkwzygg.mongodb.net/gemstoneDB?retryWrites=true&w=majority&appName=gemstone-cluster";

console.log('Attempting to connect to MongoDB Atlas Cloud...');
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Atlas Cloud Connected Successfully!');
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Error Details:', err.message);
  });

// 5. Start Server Listening on Port 5001 (Bypassing Apple AirPlay Port 5000 Hold)
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server is officially holding open and running on port ${PORT}`);
}).on('error', (err) => {
  console.error('❌ Server startup error:', err.message);
});