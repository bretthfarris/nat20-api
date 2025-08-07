import request from 'supertest';
import app from '../../app'; // Your Express instance
import { PrismaClient } from '../../generated/prisma';
import { createId } from '@paralleldrive/cuid2';

const prisma = new PrismaClient();

describe('InventoryBatch ➜ Inventory integration', () => {
  const productId = createId();
  const variantId = createId();

  beforeAll(async () => {
    // Create product + variant
    await prisma.product.create({
      data: {
        id: productId,
        name: 'Test Product',
        slug: 'test-product',
        productType: 'CARD',
        enabled: true,
      },
    });

    await prisma.productVariant.create({
      data: {
        id: variantId,
        productId: productId,
        name: 'Foil',
        attributes: { condition: 'NEAR_MINT' },
        enabled: true,
      },
    });
  });

  afterAll(async () => {
    await prisma.inventoryBatch.deleteMany({});
    await prisma.inventory.deleteMany({});
    await prisma.productVariant.deleteMany({});
    await prisma.product.deleteMany({});
  });

  it('should create a batch and update inventory', async () => {
    const batch = {
      productId,
      productVariantId: variantId,
      quantity: 10,
      costPerUnit: 2.5,
      sourceType: 'DISTRIBUTOR',
      source: { vendor: 'Acme' },
    };

    // Send request to create the batch
    const res = await request(app).post('/api/inventory-batches').send(batch);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      productId,
      quantity: 10,
      costPerUnit: 2.5,
    });

    // Query the updated inventory
    const inventory = await prisma.inventory.findFirst({
      where: {
        productId,
        productVariantId: variantId,
      },
    });

    expect(inventory).not.toBeNull();
    expect(inventory?.quantity).toBe(10);
    expect(inventory?.costBasis).toBe(2.5);
  });

  it('should correctly average costBasis across multiple batches', async () => {
    const secondBatch = {
      productId,
      productVariantId: variantId,
      quantity: 20,
      costPerUnit: 3.5,
      sourceType: 'DISTRIBUTOR',
      source: { vendor: 'Acme2' },
    };

    await request(app).post('/api/inventory-batches').send(secondBatch);

    const inventory = await prisma.inventory.findFirst({
      where: { productId, productVariantId: variantId },
    });

    // (10*2.5 + 20*3.5) / 30 = 3.166666...
    expect(inventory?.quantity).toBe(30);
    expect(Number(inventory?.costBasis.toFixed(6))).toBeCloseTo(3.166666, 4);
  });
});