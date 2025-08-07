import { Request, Response } from 'express';
import { createProduct as createProductService, getProductById as getProductByIdService, updateProduct as updateProductService, deleteProduct as deleteProductService } from '@models/product/product.service';
import { CreateProductSchema, UpdateProductSchema } from '@models/product/product.schema';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const parsed = CreateProductSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }

    const product = await createProductService(parsed.data);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create product' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = UpdateProductSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }

    const updated = await updateProductService(id, parsed.data);
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteProductService(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete product' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch product' });
  }
};