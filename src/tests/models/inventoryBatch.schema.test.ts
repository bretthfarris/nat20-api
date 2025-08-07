import { describe, it, expect } from 'vitest';
import { CreateInventoryBatchSchema, UpdateInventoryBatchSchema } from '@models/inventoryBatch/inventoryBatch.schema';
import { mockInventoryBatch } from '../utils/mockInventoryBatch';

describe('CreateInventoryBatchSchema', () => {
  it('validates a correct batch', () => {
    const mock = mockInventoryBatch();
    const result = CreateInventoryBatchSchema.safeParse(mock);
    expect(result.success).toBe(true);
  });

  it('fails if quantity is negative', () => {
    const mock = mockInventoryBatch({ quantity: -5 });
    const result = CreateInventoryBatchSchema.safeParse(mock);
    expect(result.success).toBe(false);
  });

  it('fails if required fields are missing', () => {
    const result = CreateInventoryBatchSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe('UpdateInventoryBatchSchema', () => {
  it('validates a partial update', () => {
    const result = UpdateInventoryBatchSchema.safeParse({ quantity: 5 });
    expect(result.success).toBe(true);
  });

  it('fails on invalid values', () => {
    const result = UpdateInventoryBatchSchema.safeParse({ costPerUnit: -2 });
    expect(result.success).toBe(false);
  });

  it('accepts a full valid update object', () => {
    const result = UpdateInventoryBatchSchema.safeParse(mockInventoryBatch());
    expect(result.success).toBe(true);
  });
});