import { Request, Response } from 'express';
import * as service from '../models/product/product.service';
import { CreateProductSchema } from '../models/product/product.schema';

export const createProduct = async (req: Request, res: Response) => {
  const result = CreateProductSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten() });
  }

  try {
    const product = await service.createProduct(result.data);
    return res.status(201).json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to create product' });
  }
};