// middleware/auth.middleware.js
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        if (!process.env.JWT_SECRET) {
            console.error("CRITICAL: JWT_SECRET is not defined in .env");
            return res.status(500).json({ message: "Server configuration error" });
        }

        console.log("VERIFYING SECRET:", process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const userId = decoded.id || decoded._id; 
        
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();

    } catch (err) {
        console.error("JWT Error:", err.message);
        res.status(401).json({ message: 'Invalid token' });
    }
}