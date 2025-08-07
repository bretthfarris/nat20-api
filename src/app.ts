// src/app.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/product.route';
import productVariantRoutes from './routes/productVariant.route';
import inventoryRoutes from './routes/inventory.route';
import inventoryBatchRoutes from './routes/inventoryBatch.route';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
app.use('/api/products', productRoutes);
app.use('/api/product-variants', productVariantRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/inventory-batches', inventoryBatchRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Nat20 API is alive!');
});

export default app;