import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export const createInventoryBatch = async (data: any) => {
  return prisma.$transaction(async (tx) => {
    // Find or create inventory record
    const inventory = await tx.inventory.upsert({
      where: {
        productId_productVariantId: {
          productId: data.productId,
          productVariantId: data.productVariantId ?? null,
        },
      },
      create: {
        productId: data.productId,
        productVariantId: data.productVariantId,
        quantity: 0,
        costBasis: 0,
      },
      update: {},
    });

    // Calculate new quantity and cost basis
    const oldQuantity = inventory.quantity;
    const oldCost = inventory.costBasis;

    const newQuantity = oldQuantity + data.quantity;
    const newCostBasis =
      newQuantity === 0
        ? 0
        : ((oldQuantity * oldCost) + (data.quantity * data.costPerUnit)) / newQuantity;

    // Update inventory record
    await tx.inventory.update({
      where: { id: inventory.id },
      data: {
        quantity: newQuantity,
        costBasis: newCostBasis,
      },
    });

    // Create the batch
    const batch = await tx.inventoryBatch.create({ data: {
      ...data,
      inventoryId: inventory.id,
    }});

    return batch;
  });
};

export const updateInventoryBatch = async (id: string, data: any) => {
  return prisma.inventoryBatch.update({ where: { id }, data });
};

export const deleteInventoryBatch = async (id: string) => {
  return prisma.inventoryBatch.delete({ where: { id } });
};

export const getInventoryBatchById = async (id: string) => {
  return prisma.inventoryBatch.findUnique({ where: { id } });
};

export const getBatchesForProduct = async (productId: string) => {
  return prisma.inventoryBatch.findMany({ where: { productId } });
};