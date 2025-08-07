import { createId } from '@paralleldrive/cuid2';

export const mockInventoryBatch = (overrides: Partial<any> = {}) => ({
  id: createId(),
  inventoryId: createId(),
  productId: createId(),
  productVariantId: createId(),
  quantity: 10,
  costPerUnit: 2.0,
  sourceType: 'DISTRIBUTOR',
  source: { vendor: 'ACME', invoice: 'INV-001' },
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});