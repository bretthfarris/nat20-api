import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
import cardRoutes from './routes/cardRoutes';
app.use('/cards', cardRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Nat20 API is alive!');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});