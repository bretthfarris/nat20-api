import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export const createProductVariant = (data: any) => {
  return prisma.productVariant.create({ data });
};

export const updateProductVariant = (id: string, data: any) => {
  return prisma.productVariant.update({
    where: { id },
    data,
  });
};

export const getProductVariantsByProductId = (productId: string) => {
  return prisma.productVariant.findMany({
    where: { productId },
  });
};