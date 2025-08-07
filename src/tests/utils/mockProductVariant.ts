import { createId } from '@paralleldrive/cuid2';
import type { ProductVariant } from '@prisma/client';

export function mockProductVariant(
  override?: Partial<ProductVariant>
): ProductVariant {
  return {
    id: createId(),
    productId: createId(),
    name: 'Foil',
    attributes: { condition: 'NEAR_MINT' },
    sku: 'MOCK-SKU-001',
    barcode: '0123456789012',
    enabled: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  };
}