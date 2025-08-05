import { Request, Response } from 'express';
import { CardModel } from '../models/productTypes/card';
import { CreateCardSchema, CardQuerySchema } from '../schemas/card.schema';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const createCard = async (req: Request, res: Response) => {
  const result = CreateCardSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: 'Validation failed', issues: result.error.issues });
  }

  try {
    console.log('Validated data:', result.data);
    const card = await CardModel.create(result.data);
    res.status(201).json(card);
  } catch (error) {
    console.error('❌ Error creating card:', error);
    res.status(500).json({ error: 'Failed to create card', details: error });
  }
};

export const getCards = async (req: Request, res: Response) => {
  const result = CardQuerySchema.safeParse(req.query);
  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() });
  }

  const { page, limit, game, rarity, cardType, sortBy, order, search } = result.data;
  const offset = (page - 1) * limit;

  const filters: any = {};
  if (game) filters.game = game;
  if (rarity) filters.rarity = rarity;
  if (cardType) filters.cardType = cardType;
  if (search) {
    filters.name = {
      contains: search,
      mode: 'insensitive',
    };
  }

  const orderBy = sortBy
    ? { [sortBy]: order === 'desc' ? 'desc' : 'asc' }
    : undefined;

  const [cards, total] = await Promise.all([
    prisma.card.findMany({
      where: filters,
      skip: offset,
      take: limit,
      orderBy,
    }),
    prisma.card.count({ where: filters }),
  ]);

  res.json({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    cards,
  });
};
