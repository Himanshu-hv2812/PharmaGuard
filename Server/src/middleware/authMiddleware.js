const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Check if the request has an Authorization header that starts with "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token (e.g., "Bearer eyJhbGciOi...")
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using your secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user in the database and attach them to the request (minus their password)
            req.user = await User.findById(decoded.id).select('-password');

            next(); // The token is valid, let them proceed to the AI route!
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

module.exports = { protect };