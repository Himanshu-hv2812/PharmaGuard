require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import Routes
const authRoutes = require('./src/routes/authRoutes');
const analysisRoutes = require('./src/routes/analysisRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Basic Middleware (MUST come before routes so your API can read JSON!)
app.use(cors());
app.use(express.json());

// 2. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => console.log('❌ MongoDB Error:', err));

// 3. Health Check Route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'PharmaGuard API is running smoothly.' });
});

// 4. Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/analyze', analysisRoutes);

// 5. Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});