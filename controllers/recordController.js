import db from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

// Get all records
export const getRecords = (req, res) => {
    db.query('SELECT * FROM records', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        res.status(200).json(results);
    });
};

// Add a new record
export const addRecord = (req, res) => {
    const { firstname, lastname, email } = req.body;

    if (!firstname || !lastname || !email) {
        return res.status(400).json({ message: 'Invalid input. All fields are required.' });
    }

    db.query(
        'INSERT INTO records (firstname, lastname, email) VALUES (?, ?, ?)',
        [firstname, lastname, email],
        (err) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ message: 'Email already exists.' });
                }
                return res.status(500).json({ message: 'Database error', error: err.message });
            }
            res.status(201).json({ message: 'Record added successfully' });
        }
    );
};

// Update an existing record
export const updateRecord = (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email } = req.body;

    if (!firstname || !lastname || !email) {
        return res.status(400).json({ message: 'Invalid input. All fields are required.' });
    }

    db.query(
        'UPDATE records SET firstname = ?, lastname = ?, email = ? WHERE id = ?',
        [firstname, lastname, email, id],
        (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ message: 'Email already exists.' });
                }
                return res.status(500).json({ message: 'Database error', error: err.message });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Record not found' });
            }
            res.status(200).json({ message: 'Record updated successfully' });
        }
    );
};

// Delete a record
export const deleteRecord = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM records WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json({ message: 'Record deleted successfully' });
    });
};
