import { z } from 'zod';

export const CreateCardSchema = z.object({
  game: z.string().min(1),
  name: z.string().min(1),
  set: z.string().min(1),
  attributes: z.record(z.string(), z.unknown()),
});

export const UpdateCardSchema = CreateCardSchema.partial();

// For use with TypeScript:
export type CreateCardInput = z.infer<typeof CreateCardSchema>;
export type UpdateCardInput = z.infer<typeof UpdateCardSchema>;