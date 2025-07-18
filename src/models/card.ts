import { PrismaClient, Card } from '@prisma/client';

const prisma = new PrismaClient();

export const CardModel = {
  create: (data: Omit<Card, 'id' | 'createdAt'>) => {
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