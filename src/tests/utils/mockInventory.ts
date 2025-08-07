import { createId } from '@paralleldrive/cuid2';

export const mockInventory = (overrides: Partial<any> = {}) => {
  return {
    id: createId(),
    productId: createId(),
    productVariantId: createId(),
    quantity: 10,
    costBasis: 2.5,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
};