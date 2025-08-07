import { createId } from '@paralleldrive/cuid2';

export const mockProduct = (overrides: Partial<any> = {}) => {
  return {
    id: createId(),
    name: 'Mock Product',
    slug: 'mock-product',
    productType: 'CARD', // plain string for now
    description: 'This is a mock product.',
    attributes: { publisher: 'AVALON HILL' },
    enabled: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    variants: [],
    ...overrides,
  };
};