const jwt = require('jsonwebtoken');

const protectProfileRoute = (req, res, next) => {
    // Extract token from headers
    const token = req.cookies.token;

    // Check if token exists
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Set user in request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

module.exports = protectProfileRoute;
