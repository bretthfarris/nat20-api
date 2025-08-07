import { z } from 'zod';

export const CreateInventoryBatchSchema = z.object({
  productId: z.string().min(1),
  productVariantId: z.string().optional(),
  quantity: z.number().int().nonnegative(),
  costPerUnit: z.number().nonnegative(),
  sourceType: z.string().min(1),
  source: z.record(z.string(), z.any()),
});

export const UpdateInventoryBatchSchema = CreateInventoryBatchSchema.partial();