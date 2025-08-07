import { describe, it, expect } from 'vitest';
import { CreateInventorySchema, UpdateInventorySchema } from '@models/inventory/inventory.schema';
import { mockInventory } from '../utils/mockInventory';

describe('CreateInventorySchema', () => {
  it('validates a correct inventory object', () => {
    const mock = mockInventory();
    const result = CreateInventorySchema.safeParse({
      productId: mock.productId,
      productVariantId: mock.productVariantId,
      quantity: mock.quantity,
      costBasis: mock.costBasis,
    });

    expect(result.success).toBe(true);
  });

  it('fails if quantity is negative', () => {
    const mock = mockInventory({ quantity: -10 });
    const result = CreateInventorySchema.safeParse(mock);
    expect(result.success).toBe(false);
  });

  it('fails if required fields are missing', () => {
    const result = CreateInventorySchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe('UpdateInventorySchema', () => {
  it('validates a partial update', () => {
    const result = UpdateInventorySchema.safeParse({ quantity: 15 });
    expect(result.success).toBe(true);
  });

  it('rejects an invalid update', () => {
    const result = UpdateInventorySchema.safeParse({ costBasis: -2.0 });
    expect(result.success).toBe(false);
  });

  it('accepts full update object from mockInventory', () => {
    const result = UpdateInventorySchema.safeParse(mockInventory());
    expect(result.success).toBe(true);
  });
});