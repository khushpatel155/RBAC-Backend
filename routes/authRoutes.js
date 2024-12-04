import express from 'express';
import { register,login,changePermissions } from '../controllers/authController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/register', register);

router.post('/login', login);

// Route to change user permissions (admin-only access)
router.put('/permissions/:id', authenticateJWT, changePermissions);

export default router; // Export the router to use in the main application
