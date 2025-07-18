import { z } from 'zod';
import { OverpowerAttributesSchema } from './attributes/overpower.schema';

// The registry of supported games and their attribute validators
const AttributeSchemas: Record<string, z.ZodTypeAny> = {
  overpower: OverpowerAttributesSchema,
};

export const CreateCardSchema = z.object({
  game: z.string().min(1),
  name: z.string().min(1),
  set: z.string().min(1),
  attributes: z.record(z.string(), z.any()),
}).refine((data) => {
  const schema = AttributeSchemas[data.game.toLowerCase()];
  return schema?.safeParse(data.attributes).success === true;
}, {
  message: 'Invalid attributes for the specified game',
  path: ['attributes'],
});

export const UpdateCardSchema = CreateCardSchema.partial();

// For use with TypeScript:
export type CreateCardInput = z.infer<typeof CreateCardSchema>;
export type UpdateCardInput = z.infer<typeof UpdateCardSchema>;