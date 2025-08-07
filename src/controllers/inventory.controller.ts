import { Request, Response } from 'express';
import * as service from '@models/inventory/inventory.service';
import { CreateInventorySchema, UpdateInventorySchema } from '@models/inventory/inventory.schema';

export const createInventory = async (req: Request, res: Response) => {
  const parsed = CreateInventorySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten() });
  }

  try {
    const inventory = await service.createInventory(parsed.data);
    return res.status(201).json(inventory);
  } catch {
    return res.status(500).json({ error: 'Failed to create inventory' });
  }
};

export const updateInventory = async (req: Request, res: Response) => {
  const parsed = UpdateInventorySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten() });
  }

  try {
    const inventory = await service.updateInventory(req.params.id, parsed.data);
    return res.status(200).json(inventory);
  } catch {
    return res.status(500).json({ error: 'Failed to update inventory' });
  }
};

export const deleteInventory = async (req: Request, res: Response) => {
  try {
    await service.deleteInventory(req.params.id);
    return res.status(204).send();
  } catch {
    return res.status(500).json({ error: 'Failed to delete inventory' });
  }
};

export const getInventoryById = async (req: Request, res: Response) => {
  try {
    const inventory = await service.getInventoryById(req.params.id);
    if (!inventory) return res.status(404).json({ error: 'Inventory not found' });
    return res.status(200).json(inventory);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch inventory' });
  }
};

export const getInventoryForProduct = async (req: Request, res: Response) => {
  try {
    const inventory = await service.getInventoryForProduct(req.params.productId);
    return res.status(200).json(inventory);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch product inventory' });
  }
};