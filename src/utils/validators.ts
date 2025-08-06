import { z } from 'zod';

export const cuid2 = z.string().regex(/^[a-z][a-z0-9]{23,}$/, 'Invalid CUID2');