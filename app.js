import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import recordRoutes from './routes/recordRoutes.js';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/records', recordRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
