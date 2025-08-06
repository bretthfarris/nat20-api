import { z } from 'zod';
import { ProductVariantAttributesSchema } from './productVariantAttributes.schema';
import { cuid2 } from '@utils/validators';

export const CreateProductVariantSchema = z.object({
  productId: cuid2,
  name: z.string().optional(),
  attributes: ProductVariantAttributesSchema.optional(),
  isUsed: z.boolean().default(true),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  enabled: z.boolean().default(true),
});

export const UpdateProductVariantSchema = CreateProductVariantSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: 'At least one field must be updated.' }
);