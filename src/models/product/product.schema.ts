import { z } from 'zod';
import { ProductType } from '../../constants/product.enums';
import sl from 'zod/v4/locales/sl.cjs';

export const CreateProductSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  productType: z.enum(Object.keys(ProductType) as [keyof typeof ProductType]),
  enabled: z.boolean().default(true),
  attributes: z.record(z.string(), z.any()).optional(), // JSON blob per product type
});