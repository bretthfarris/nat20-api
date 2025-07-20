import { PrismaClient, Prisma } from '../generated/prisma';

const prisma = new PrismaClient();

type CreateCardInput = {
  game: string;
  name: string;
  set: string;
  attributes: object;
};

export const CardModel = {
  create: (data: CreateCardInput) => {
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

  update: (id: number, data: Prisma.CardUpdateInput) => {
    return prisma.card.update({ where: { id }, data });
  }
};