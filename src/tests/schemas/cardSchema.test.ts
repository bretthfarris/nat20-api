import { describe, it, expect } from 'vitest';
import { CreateCardSchema } from '../../schemas/card.schema';

describe('CreateCardSchema', () => {
  it('validates a correct OverPower card', () => {
    const result = CreateCardSchema.safeParse({
      game: 'overpower',
      name: 'Cyclops',
      set: 'PowerSurge',
      attributes: {
        type: 'Character',
        powerGrid: {
          energy: 4,
          fighting: 5,
          strength: 3,
          intellect: 2,
        }
      },
      
    });

    expect(result.success).toBe(true);
  });

  it('rejects OverPower card with invalid power level', () => {
    const result = CreateCardSchema.safeParse({
      game: 'overpower',
      name: 'Cyclops',
      set: 'PowerSurge',
      attributes: {
        type: 'Character',
        powerGrid: {
          energy: 99, // invalid
          fighting: 5,
          strength: 3,
          intellect: 2,
        },
      },
    });

    expect(result.success).toBe(false);
  });
});