import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createProduct, getProductById, updateProduct, deleteProduct } from '@controllers/product.controller';
import * as service from '@models/product/product.service';
import { mockProduct } from '../utils/mockProduct';

const mockRes = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('createProduct', () => {
  const req = {
    body: {
      name: 'Mock Product',
      productType: 'CARD',
      slug: 'mock-product',
    },
  } as any;

  it('should return 201 with created product', async () => {
    const mock = mockProduct(req.body);
    vi.spyOn(service, 'createProduct').mockResolvedValue(mock);

    const res = mockRes();
    await createProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mock);
  });

  it('should return 400 if schema validation fails', async () => {
    const badReq = { body: {} } as any;
    const res = mockRes();

    await createProduct(badReq, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ errors: expect.anything() }));
  });

  it('should return 500 on service error', async () => {
    vi.spyOn(service, 'createProduct').mockRejectedValue(new Error('fail'));

    const res = mockRes();
    await createProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create product' });
  });
});

describe('getProductById', () => {
  const req = { params: { id: 'mock-id' } } as any;

  it('should return 200 with product', async () => {
    const mock = mockProduct({ id: 'mock-id' });
    vi.spyOn(service, 'getProductById').mockResolvedValue(mock);

    const res = mockRes();
    await getProductById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mock);
  });

  it('should return 404 if product not found', async () => {
    vi.spyOn(service, 'getProductById').mockResolvedValue(null);

    const res = mockRes();
    await getProductById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Product not found' });
  });

  it('should return 500 on error', async () => {
    vi.spyOn(service, 'getProductById').mockRejectedValue(new Error('fail'));

    const res = mockRes();
    await getProductById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch product' });
  });
});