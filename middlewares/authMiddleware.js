import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; // Secret key for verifying JWT

// Middleware to authenticate JWT
export const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized. Token is missing.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); 
        req.user = decoded; 
        next(); 
    } catch (err) {
        return res.status(403).json({ message: 'Forbidden. Invalid or expired token.' });
    }
};

// Middleware to authorize based on role permissions
export const authorizeRole = (requiredPermission) => (req, res, next) => {
    
    // Ensure the user's permission level meets or exceeds the required level
    if (req.user.permissions < requiredPermission) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
    next();
};

// Utility to generate JWT tokens
export const generateJWT = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username, role: user.role, permissions: user.permissions },
        JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};
