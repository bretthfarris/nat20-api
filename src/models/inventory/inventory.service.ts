import { PrismaClient } from '../../generated/prisma';
const prisma = new PrismaClient();

export const createInventory = async (data: any) => {
  return prisma.inventory.create({ data });
};

export const updateInventory = async (id: string, data: any) => {
  return prisma.inventory.update({ where: { id }, data });
};

export const deleteInventory = async (id: string) => {
  return prisma.inventory.delete({ where: { id } });
};

export const getInventoryById = async (id: string) => {
  return prisma.inventory.findUnique({ where: { id } });
};

export const getInventoryForProduct = async (productId: string) => {
  return prisma.inventory.findMany({ where: { productId } });
};