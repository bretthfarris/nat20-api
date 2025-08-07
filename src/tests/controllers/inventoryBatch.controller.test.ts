import { describe, it, expect, vi } from 'vitest';
import * as service from '@models/inventoryBatch/inventoryBatch.service';
import {
  createInventoryBatch,
  updateInventoryBatch,
  deleteInventoryBatch,
  getInventoryBatchById,
  getBatchesForProduct,
} from '@controllers/inventoryBatch.controller';
import { mockInventoryBatch } from '../utils/mockInventoryBatch';

const mockRes = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.send = vi.fn().mockReturnValue(res);
  return res;
};

describe('InventoryBatch Controller', () => {
  it('createInventoryBatch: returns 201 with created batch', async () => {
    const mock = mockInventoryBatch();
    vi.spyOn(service, 'createInventoryBatch').mockResolvedValue(mock);

    const req = { body: mock } as any;
    const res = mockRes();

    await createInventoryBatch(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mock);
  });

  it('createInventoryBatch: returns 400 if schema is invalid', async () => {
    const req = { body: { quantity: -10 } } as any;
    const res = mockRes();

    await createInventoryBatch(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ errors: expect.anything() }));
  });

  it('updateInventoryBatch: returns 200 with updated batch', async () => {
    const mock = mockInventoryBatch({ id: 'batch1', quantity: 25 });
    vi.spyOn(service, 'updateInventoryBatch').mockResolvedValue(mock);

    const req = { params: { id: 'batch1' }, body: { quantity: 25 } } as any;
    const res = mockRes();

    await updateInventoryBatch(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mock);
  });

  it('deleteInventoryBatch: returns 200 on delete', async () => {
    const mock = mockInventoryBatch({ id: 'batch1' });
    vi.spyOn(service, 'deleteInventoryBatch').mockResolvedValue(mock);

    const req = { params: { id: 'batch1' } } as any;
    const res = mockRes();

    await deleteInventoryBatch(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mock);
  });

  it('getInventoryBatchById: returns 200 with batch', async () => {
    const mock = mockInventoryBatch({ id: 'batch1' });
    vi.spyOn(service, 'getInventoryBatchById').mockResolvedValue(mock);

    const req = { params: { id: 'batch1' } } as any;
    const res = mockRes();

    await getInventoryBatchById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mock);
  });

  it('getInventoryBatchById: returns 404 if not found', async () => {
    vi.spyOn(service, 'getInventoryBatchById').mockResolvedValue(null);

    const req = { params: { id: 'missing' } } as any;
    const res = mockRes();

    await getInventoryBatchById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Inventory batch not found' });
  });

  it('getBatchesForProduct: returns 200 with batch list', async () => {
    const list = [mockInventoryBatch(), mockInventoryBatch()];
    vi.spyOn(service, 'getBatchesForProduct').mockResolvedValue(list);

    const req = { params: { productId: 'prod123' } } as any;
    const res = mockRes();

    await getBatchesForProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(list);
  });
});