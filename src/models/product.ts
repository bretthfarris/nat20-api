import { PrismaClient, Prisma } from '../generated/prisma';

const prisma = new PrismaClient();

type CreateProductInput = {
  name: string;
  description: string;
  productType: string;
  attributes: object;
};

export const ProductModel = {
  create: (data: CreateProductInput) => {
    return prisma.product.create({ data });
  },

  findAll: () => {
    return prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  },

  findById: (id: number) => {
    return prisma.product.findUnique({ where: { id } });
  },

  delete: (id: number) => {
    return prisma.product.delete({ where: { id } });
  },

  update: (id: number, data: Prisma.ProductUpdateInput) => {
    return prisma.product.update({ where: { id }, data });
  }
};