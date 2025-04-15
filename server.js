import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import planRoutes from './routes/planRoutes.js';
import dietitianRoutes from './routes/dietitianRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Get directory path in ES modules
const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = path.dirname(currentFilePath);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(currentDirPath, 'uploads')));

// Add this root route handler
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Dietition Bridge API is running',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/dietitians', dietitianRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error(err));
