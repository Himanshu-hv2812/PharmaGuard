require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import Routes
const authRoutes = require('./src/routes/authRoutes');
const analysisRoutes = require('./src/routes/analysisRoutes');

const app = express();

// Render uses a dynamic port. We must use process.env.PORT
const PORT = process.env.PORT || 5000;

// 1. Production CORS (Update this with your actual Render frontend URL)
app.use(cors({
    origin: [
        'http://localhost:5173', 
        'https://capable-dodol-6eca80.netlify.app' // <-- Put your Live Frontend URL here
    ],
    credentials: true
}));

app.use(express.json());

// 2. Optimized MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected Successfully');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        // Exit process with failure
        process.exit(1);
    }
};

connectDB();

// 3. Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'PharmaGuard API is running.' });
});

// 4. Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/analyze', analysisRoutes);

// 5. Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on Port: ${PORT}`);
});