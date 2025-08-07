import { Request, Response } from 'express';
import * as service from '@models/inventoryBatch/inventoryBatch.service';
import { CreateInventoryBatchSchema, UpdateInventoryBatchSchema } from '@models/inventoryBatch/inventoryBatch.schema';

export const createInventoryBatch = async (req: Request, res: Response) => {
  const parsed = CreateInventoryBatchSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten() });
  }

  try {
    const batch = await service.createInventoryBatch(parsed.data);
    return res.status(201).json(batch);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create inventory batch' });
  }
};

export const updateInventoryBatch = async (req: Request, res: Response) => {
  const parsed = UpdateInventoryBatchSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten() });
  }

  try {
    const batch = await service.updateInventoryBatch(req.params.id, parsed.data);
    return res.status(200).json(batch);
  } catch {
    return res.status(500).json({ error: 'Failed to update inventory batch' });
  }
};

export const deleteInventoryBatch = async (req: Request, res: Response) => {
  try {
    const deleted = await service.deleteInventoryBatch(req.params.id);
    return res.status(200).json(deleted);
  } catch {
    return res.status(500).json({ error: 'Failed to delete inventory batch' });
  }
};

export const getInventoryBatchById = async (req: Request, res: Response) => {
  try {
    const batch = await service.getInventoryBatchById(req.params.id);
    if (!batch) return res.status(404).json({ error: 'Inventory batch not found' });
    return res.status(200).json(batch);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch inventory batch' });
  }
};

export const getBatchesForProduct = async (req: Request, res: Response) => {
  try {
    const batches = await service.getBatchesForProduct(req.params.productId);
    return res.status(200).json(batches);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch batches for product' });
  }
};