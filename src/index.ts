import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/product.route';
import productVariantRoutes from './routes/productVariant.route';
import inventoryRoutes from './routes/inventory.route';
import inventoryBatchRoutes from './routes/inventoryBatch.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
app.use('/api/products', productRoutes);
app.use('/api/product-variants', productVariantRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/inventory-batches', inventoryBatchRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Nat20 API is alive!');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});