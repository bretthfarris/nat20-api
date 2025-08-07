import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createProductVariant, updateProductVariant, getVariantsByProductId } from '@controllers/productVariant.controller';
import * as service from '@models/productVariant/productVariant.service';
import { createId } from '@paralleldrive/cuid2';
import { UpdateProductVariantSchema } from '@models/productVariant/productVariant.schema';
import { mockProductVariant } from '../utils/mockProductVariant';


const mockRes = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

const validProductId = createId();

describe('createProductVariant', () => {
  const validRequest = {
    body: {
      productId: validProductId,
      name: 'Foil',
      attributes: { condition: 'NEAR_MINT' },
      isUsed: true,
      enabled: true,
    },
  } as any;

  it('should return 201 with created variant', async () => {
    const mockVariant = { id: 'var123', ...validRequest.body };
    vi.spyOn(service, 'createProductVariant').mockResolvedValue(mockVariant);

    const res = mockRes();
    await createProductVariant(validRequest, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockVariant);
  });

  it('should return 400 if schema validation fails', async () => {
    const req = { body: { name: 'MissingProductId' } } as any;
    const res = mockRes();

    await createProductVariant(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ errors: expect.anything() }));
  });

  it('should return 500 on service error', async () => {
    vi.spyOn(service, 'createProductVariant').mockRejectedValue(new Error('DB error'));

    const res = mockRes();
    await createProductVariant(validRequest, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create product variant' });
  });
});

describe('updateProductVariant', () => {
  const req = {
    params: { id: 'var123' },
    body: { name: 'Updated Name' },
  } as any;

  it('should return 200 with updated variant', async () => {
    const updated = { id: validProductId, name: 'Updated Name' };
    vi.spyOn(service, 'updateProductVariant').mockResolvedValue(mockProductVariant());

    const res = mockRes();
    await updateProductVariant(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  it('should return 400 if body is invalid', async () => {
    const badReq = { params: { id: '123' }, body: { productId: '123' } } as any;
    const res = mockRes();
    await updateProductVariant(badReq, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should return 500 on error', async () => {
    vi.spyOn(service, 'updateProductVariant').mockRejectedValue(new Error('fail'));

    const res = mockRes();
    await updateProductVariant(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to update product variant' });
  });
});

describe('getVariantsByProductId', () => {
  const req = { params: { productId: validProductId } } as any;

  it('should return 200 with variants array', async () => {
    const id1 = createId(), id2 = createId();
    const mockVariants = [{ id: id1 }, { id: id2 }];
    vi.spyOn(service, 'getProductVariantsByProductId').mockResolvedValue([
        mockProductVariant({ id: id1 }),
        mockProductVariant({ id: id2, name: 'Showcase' }),
    ]);

    const res = mockRes();
    await getVariantsByProductId(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockVariants);
  });

  it('should return 500 on error', async () => {
    vi.spyOn(service, 'getProductVariantsByProductId').mockRejectedValue(new Error('fail'));

    const res = mockRes();
    await getVariantsByProductId(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch product variants' });
  });
});

