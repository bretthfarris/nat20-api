import { z } from 'zod';

export const CreateInventorySchema = z.object({
  productId: z.string().min(1),
  productVariantId: z.string().optional(),
  quantity: z.number().int().min(0),
  costBasis: z.number().nonnegative(),
});

export const UpdateInventorySchema = CreateInventorySchema.partial();