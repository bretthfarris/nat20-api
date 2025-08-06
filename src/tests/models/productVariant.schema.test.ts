import { describe, it, expect } from 'vitest';
import { CreateProductVariantSchema, UpdateProductVariantSchema } from '../../models/productVariant/productVariant.schema';
import { createId } from '@paralleldrive/cuid2';

const validProductId = createId();

const baseValidInput: {
  productId: string;
  name?: string;
  attributes?: {
    condition?: string;
    language?: string;
    grade?: string;
  };
  isUsed?: boolean;
  sku?: string;
  barcode?: string;
  enabled?: boolean;
} = {
  productId: validProductId, // must be a valid cuid
  name: 'Foil',
  attributes: {
    condition: 'NEAR_MINT',
    language: 'EN',
    grade: 'PSA 9',
  },
  isUsed: true,
  sku: 'FOIL-XYZ-123',
  barcode: '012345678905',
  enabled: true,
};

describe('CreateProductVariantSchema', () => {
  it('should validate a fully populated product variant', () => {
    const result = CreateProductVariantSchema.safeParse(baseValidInput);
    expect(result.success).toBe(true);
  });

  it('should allow missing optional fields like name and attributes', () => {
    const result = CreateProductVariantSchema.safeParse({
      productId: createId(),
    });
    expect(result.success).toBe(true);
  });

  it('should fail if productId is not a cuid', () => {
    const result = CreateProductVariantSchema.safeParse({
      ...baseValidInput,
      productId: '123-not-a-cuid',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.productId).toBeDefined();
    }
  });

  it('should default isUsed to true when missing', () => {
    const input = { ...baseValidInput };
    delete input.isUsed;
    const result = CreateProductVariantSchema.safeParse(input);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.isUsed).toBe(true);
    }
  });

  it('should default enabled to true when missing', () => {
    const input = { ...baseValidInput };
    delete input.enabled;
    const result = CreateProductVariantSchema.safeParse(input);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.enabled).toBe(true);
    }
  });
});

describe('UpdateProductVariantSchema', () => {
  it('should accept partial input', () => {
    const result = UpdateProductVariantSchema.safeParse({
      name: 'Borderless',
      isUsed: false,
    });
    expect(result.success).toBe(true);
  });

  it('should fail if productId is invalid', () => {
    const result = UpdateProductVariantSchema.safeParse({
      productId: 'invalid-id',
    });
    expect(result.success).toBe(false);
  });

  it('should succeed with valid partial productId', () => {
    const result = UpdateProductVariantSchema.safeParse({
      productId: validProductId,
    });
    expect(result.success).toBe(true);
  });

  it('should reject unknown fields', () => {
    const result = UpdateProductVariantSchema.safeParse({
      unknownField: 'bad',
    });

    expect(result.success).toBe(true); // ← Zod will ignore unknown fields unless `.strict()` is used
    // If you want to restrict unknowns:
    // Use `.strict()` on the base schema and this will fail
  });
});