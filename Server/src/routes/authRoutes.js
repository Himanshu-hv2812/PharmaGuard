const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @route POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        console.log("📥 Incoming Registration Data:", req.body); // Let's see what React sent!

        const { name, email, password, role } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            console.log("⚠️ Registration failed: Email already in use.");
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ name, email, password, role });
        console.log("✅ User successfully saved to MongoDB!");

        res.status(201).json({
            _id: user._id, name: user.name, email: user.email, role: user.role,
            token: generateToken(user._id)
        });
    } catch (error) {
        console.error("🚨 FATAL REGISTRATION ERROR:", error); // This is the smoking gun!
        res.status(500).json({ message: 'Server error', details: error.message });
    }
});

// @route POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        console.log("📥 Incoming Login Data:", req.body);
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            console.log("✅ Login successful!");
            res.json({
                _id: user._id, name: user.name, email: user.email, role: user.role,
                token: generateToken(user._id)
            });
        } else {
            console.log("❌ Login failed: Invalid credentials.");
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error("🚨 FATAL LOGIN ERROR:", error);
        res.status(500).json({ message: 'Server error', details: error.message });
    }
});

module.exports = router;