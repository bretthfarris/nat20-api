import { Request, Response } from 'express';
import * as service from '../models/productVariant/productVariant.service';
import { CreateProductVariantSchema, UpdateProductVariantSchema } from '../models/productVariant/productVariant.schema';

export const createProductVariant = async (req: Request, res: Response) => {
  const result = CreateProductVariantSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten() });
  }

  try {
    const variant = await service.createProductVariant(result.data);
    return res.status(201).json(variant);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to create product variant' });
  }
};

export const updateProductVariant = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = UpdateProductVariantSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten() });
  }

  try {
    const variant = await service.updateProductVariant(id, result.data);
    return res.status(200).json(variant);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to update product variant' });
  }
};

export const getVariantsByProductId = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const variants = await service.getProductVariantsByProductId(productId);
    return res.status(200).json(variants);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch product variants' });
  }
};