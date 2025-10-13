const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes
const protect = async (req, res, next) => {
    let token;

    // 1. Check if the token exists and is in the correct format
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 2. Extract the token from the "Bearer <token>" string
            token = req.headers.authorization.split(' ')[1];

            // 3. Verify the token is valid
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Find the user from the token's payload and attach it to the request
            // This makes req.user available in the next function (e.g., your controller)
            req.user = await User.findById(decoded.id).select('-password');

            // 5. If everything is successful, proceed to the next middleware/controller
            next();
        } catch (error) {
            // This block runs if jwt.verify fails (invalid signature, expired, etc.)
            console.error('TOKEN VERIFICATION FAILED:', error);
            res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }

    // This runs if the 'if' condition at the top is false
    if (!token) {
        res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
    }
};

module.exports = { protect };