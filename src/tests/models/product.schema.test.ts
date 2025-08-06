import { describe, it, expect } from 'vitest';
import { CreateProductSchema } from '../../models/product/product.schema';
import {slugify } from '../../utils/slugify';

describe('CreateProductSchema', () => {
  it('passes with valid input', () => {
    const result = CreateProductSchema.safeParse({
      name: 'Lightning Bolt',
      productType: 'CARD',
      slug: slugify('Lightning Bolt')
    });
    expect(result.success).toBe(true);
  });

  it('fails if name is missing', () => {
    const result = CreateProductSchema.safeParse({
      productType: 'CARD',
      slug: slugify('Lightning Bolt')
    });
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues.some(e => e.path.includes('name'))).toBe(true);
    }
  });

  it('fails if productType is missing', () => {
    const result = CreateProductSchema.safeParse({
      name: 'No Type Product',
      slug: slugify('Lightning Bolt')
    });
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues.some(e => e.path.includes('productType'))).toBe(true);
    }
  });

  it('fails if productType is invalid', () => {
    const result = CreateProductSchema.safeParse({
      name: 'Bad Type Product',
      slug: slugify('Lightning Bolt'),
      productType: 'INVALID_TYPE',
    });
    expect(result.success).toBe(false);
  });

  it('accepts optional attributes as JSON', () => {
    const result = CreateProductSchema.safeParse({
      name: 'With Attributes',
      productType: 'CARD',
      slug: slugify('Lightning Bolt'),
      attributes: {
        manaCost: 1,
        text: 'Deal 3 damage.',
      },
    });
    expect(result.success).toBe(true);
  });

  it('fails if missing slug', () => {
    const result = CreateProductSchema.safeParse({
      name: 'Slug Product',
      productType: 'CARD',
    });
    expect(result.success).toBe(false);
  });

  it('defaults enabled to true', () => {
    const result = CreateProductSchema.parse({
      name: 'Default Enabled Product',
      productType: 'CARD',
      slug: slugify('Lightning Bolt')
    });
    expect(result.enabled).toBe(true);
  });
});