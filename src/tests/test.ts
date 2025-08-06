import { z } from 'zod';

const schema = z.object({
  productId: z.cuid2(),
});

console.log(schema.safeParse({ productId: 'invalid' }));