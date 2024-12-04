import express from 'express';
import { getRecords,addRecord,updateRecord,deleteRecord } from '../controllers/recordController.js';
import { authenticateJWT, authorizeRole } from '../middlewares/authMiddleware.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get('/', authenticateJWT, authorizeRole(0), getRecords);
router.post('/', authenticateJWT, authorizeRole(1), addRecord);
router.put('/:id', authenticateJWT, authorizeRole(1), updateRecord);
router.delete('/:id', authenticateJWT, authorizeRole(2), deleteRecord);

export default router;
