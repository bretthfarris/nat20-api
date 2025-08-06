import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/product.route';
import productVariantRoutes from './routes/productVariant.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
app.use('/api', productRoutes);
app.use('/api/product-variants', productVariantRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Nat20 API is alive!');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});