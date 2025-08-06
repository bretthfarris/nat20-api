import { z } from 'zod';

export const ProductVariantAttributesSchema = z.object({
  condition: z.enum(['NEAR_MINT', 'LIGHTLY_PLAYED', 'MODERATELY_PLAYED', 'HEAVILY_PLAYED', 'DAMAGED', 'GRADED']),
  language: z.enum(['EN', 'JP', 'DE', 'FR', 'IT', 'ES']).optional(),
  grade: z.string().optional(),
});