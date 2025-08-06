import { PrismaClient, Prisma } from '../../generated/prisma';
import { CreateProductInput } from './product.types';

const prisma = new PrismaClient();

export const createProduct = async (data: CreateProductInput) => {
  const { productType, ...rest } = data;
  return await prisma.product.create({
    data: {
      ...rest,
      productType: productType, // 👈 Rename to match Prisma schema
    },
  });
};

export const getProductById = async (id: string) => {
  return await prisma.product.findUnique({
    where: { id },
    include: { variants: true }, // Assuming relation exists
  });
};