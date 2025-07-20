import { z } from 'zod';
import { OverpowerAttributesSchema } from './attributes/overpower.schema';

// The registry of supported games and their attribute validators
const AttributeSchemas: Record<string, z.ZodTypeAny> = {
  overpower: OverpowerAttributesSchema,
};

export const BaseCardSchema = z.object({
  game: z.string().min(1),
  name: z.string().min(1),
  set: z.string().min(1),
  attributes: z.record(z.string(), z.any()),
});

// Replace deprecated .superRefine() with modern .refine() w/ context
export const CreateCardSchema = BaseCardSchema.refine(
  (data) => {
    const gameSchema = AttributeSchemas[data.game.toLowerCase()];
    if (!gameSchema) {
      console.log("Schema does not exist for " + data.game + " at ./attributes/" + data.game.toLowerCase() + ".schema.ts");
      return false;
    }

    const result = gameSchema.safeParse(data.attributes);
    return result.success;
  },
  {
    message: 'Invalid attributes for the specified game',
    path: ['attributes'], // Pin the error to the attributes key
  }
);

export const UpdateCardSchema = CreateCardSchema.partial();

export const CardQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  game: z.string().optional(),
  rarity: z.string().optional(),
  cardType: z.string().optional(),
  sortBy: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
  search: z.string().optional(),
});

// For use with TypeScript:
export type CreateCardInput = z.infer<typeof CreateCardSchema>;
export type UpdateCardInput = z.infer<typeof UpdateCardSchema>;
export type CardQueryParams = z.infer<typeof CardQuerySchema>;
