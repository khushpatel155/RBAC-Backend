import bcrypt from'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; // JWT secret from environment variables
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN; // Token expiration time

// User registration
export const register = async (req, res) => {
    const { firstname, lastname, username, email, password, role } = req.body;

    const validRoles = ['admin', 'manager', 'user']; // Allowed roles

    // Validate input fields
    if (!firstname || !lastname || !username || !email || !password || !role || !validRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid input. Please fill all fields correctly.' });
    }

    try {
        // Assign numeric permissions based on the role
        let permissions = 0; // Default permission is 'read' (0)
        if (role === 'admin') permissions = 2; // 'delete'
        else if (role === 'manager') permissions = 1; // 'write'

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database
        const query = `
            INSERT INTO users (firstname, lastname, username, email, password, role, permissions)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [firstname, lastname, username, email, hashedPassword, role, permissions];

        db.query(query, values, (err) => {
            if (err) {
                // Handle duplicate email/username errors
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ message: 'User with this email or username already exists.' });
                }
                return res.status(500).json({ message: 'Database error', error: err.message });
            }

            // Success response
            res.status(201).json({
                message: 'User registered successfully',
                user: { firstname, lastname, username, email, role, permissions },
            });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// User login
export const login = (req, res) => {
    const { email, password } = req.body;

    // Fetch the user by email
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err.message });

        if (results.length === 0) return res.status(404).json({ message: 'User not found' });

        const user = results[0];

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // Generate a JWT for the authenticated user
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });

        res.status(200).json({ token }); 
    });
};

// Change user permissions
export const changePermissions = (req, res) => {
    const { id } = req.params; // User ID
    const { permissions } = req.body; // New permissions (0, 1, or 2)

    // Allow only admin users to change permissions
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    // Validate the permissions value
    const validPermissions = [0, 1, 2];
    if (!validPermissions.includes(permissions)) {
        return res.status(400).json({ message: 'Invalid permission value. Must be 0 (read), 1 (write), or 2 (delete).' });
    }

    // Verify the user exists
    const fetchUserQuery = 'SELECT * FROM users WHERE id = ?';
    db.query(fetchUserQuery, [id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err.message });
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's permissions
        const updateQuery = 'UPDATE users SET permissions = ? WHERE id = ?';
        db.query(updateQuery, [permissions, id], (err) => {
            if (err) return res.status(500).json({ message: 'Database error', error: err.message });
            res.status(200).json({
                message: 'Permissions updated successfully',
                updatedPermissions: permissions,
            });
        });
    });
};
