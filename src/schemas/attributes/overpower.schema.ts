import { z } from 'zod';

export const OverpowerAttributesSchema = z.object({
  type: z.enum(['Character', 'Power', 'Special', 'Mission', 'Universe', 'Tactic']),
  powerGrid: z.object({
    energy: z.number().min(0).max(8),
    fighting: z.number().min(0).max(8),
    strength: z.number().min(0).max(8),
    intellect: z.number().min(0).max(8),
  }).optional(),
  teamAffiliation: z.string().optional(),
  assignedCharacter: z.string().optional(),
  characterAbility: z.string().optional(),
  onePerDeck: z.boolean().optional(),
  text: z.string().optional(),
  rarity: z.enum(['Common', 'Uncommon', 'Rare', 'Super Rare', 'Ultra Rare']).optional(),
});

