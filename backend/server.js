const express = require('express');
const cors = require('cors');
const recommendationRoutes = require('./routes/recommendationRoutes');

const app = express();

// SECURITY GATE: This allows your frontend webpage to talk to this backend
app.use(cors());

// TRANSLATOR: This helps your backend read JSON data sent by the frontend form
app.use(express.json());

// ROUTE LINK: Connects your gemstone prediction code logic
app.use('/api/recommendations', recommendationRoutes);

// START ENGINE: Holds the server open on local port 5001
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running smoothly on local port ${PORT}`);
});