require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Basic Middleware
app.use(cors());
app.use(express.json()); // Allows parsing of JSON bodies

// Health Check Route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'PharmaGuard API is running smoothly.' });
});

// Import Routes
const analysisRoutes = require('./src/routes/analysisRoutes');

// Mount Routes
app.use('/api', analysisRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});