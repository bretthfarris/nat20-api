import { PrismaClient, Prisma } from '@prisma/client';
import { Card } from '../generated/prisma';

const prisma = new PrismaClient();

export const CardModel = {
  create: (data: any) => {
    return prisma.card.create({ data });
  },

  findAll: () => {
    return prisma.card.findMany({ orderBy: { createdAt: 'desc' } });
  },

  findById: (id: number) => {
    return prisma.card.findUnique({ where: { id } });
  },

  delete: (id: number) => {
    return prisma.card.delete({ where: { id } });
  },
};