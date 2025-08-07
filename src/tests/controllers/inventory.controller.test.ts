import { describe, it, expect, vi } from 'vitest';
import * as service from '@models/inventory/inventory.service';
import {
  createInventory,
  updateInventory,
  getInventoryById,
  deleteInventory,
  getInventoryForProduct,
} from '@controllers/inventory.controller';
import { mockInventory } from '../utils/mockInventory';
import { devNull } from 'os';

const mockRes = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.send = vi.fn().mockReturnValue(res);
  return res;
};

describe('Inventory Controller', () => {
  const validBody = {
    productId: 'prod123',
    productVariantId: 'var123',
    quantity: 3,
    costBasis: 2.5,
  };

  it('createInventory: should return 201 with created inventory', async () => {
    const mock = mockInventory({ ...validBody });
    vi.spyOn(service, 'createInventory').mockResolvedValue(mock);

    const req = { body: validBody } as any;
    const res = mockRes();

    await createInventory(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mock);
  });

  it('createInventory: should return 400 if schema validation fails', async () => {
    const req = { body: { quantity: -1 } } as any;
    const res = mockRes();

    await createInventory(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ errors: expect.anything() }));
  });

  it('updateInventory: should return 200 with updated inventory', async () => {
    const updated = mockInventory({ id: 'inv123', quantity: 10 });
    vi.spyOn(service, 'updateInventory').mockResolvedValue(updated);

    const req = { params: { id: 'inv123' }, body: { quantity: 10 } } as any;
    const res = mockRes();

    await updateInventory(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  it('getInventoryById: should return 200 with found inventory', async () => {
    const mock = mockInventory({ id: 'inv123' });
    vi.spyOn(service, 'getInventoryById').mockResolvedValue(mock);

    const req = { params: { id: 'inv123' } } as any;
    const res = mockRes();

    await getInventoryById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mock);
  });

  it('getInventoryById: should return 404 if not found', async () => {
    vi.spyOn(service, 'getInventoryById').mockResolvedValue(null);

    const req = { params: { id: 'not-found' } } as any;
    const res = mockRes();

    await getInventoryById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Inventory not found' });
  });

  it('deleteInventory: should return 204 on successful delete', async () => {
    vi.spyOn(service, 'deleteInventory').mockResolvedValue(mockInventory({ id: 'inv123' }));

    const req = { params: { id: 'inv123' } } as any;
    const res = mockRes();

    await deleteInventory(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('getInventoryForProduct: should return 200 with inventory list', async () => {
    const mockList = [mockInventory(), mockInventory()];
    vi.spyOn(service, 'getInventoryForProduct').mockResolvedValue(mockList);

    const req = { params: { productId: 'prod123' } } as any;
    const res = mockRes();

    await getInventoryForProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockList);
  });
});