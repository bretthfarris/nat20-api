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

export const updateProduct = async (id: string, data: Partial<any>) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: string) => {
  return prisma.product.delete({ where: { id } });
};

export const getProductById = async (id: string) => {
  return await prisma.product.findUnique({
    where: { id },
    include: { variants: true }, // Assuming relation exists
  });
};