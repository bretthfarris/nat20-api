import request from 'supertest';
import express from 'express';
import cardRoutes from '../../routes/cardRoutes';
import { PrismaClient } from '../../generated/prisma';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use('/cards', cardRoutes);

describe('Card API Routes', () => {
  it('should create a valid OverPower card', async () => {
    const response = await request(app).post('/cards').send({
      game: 'overpower',
      name: 'Cyclops',
      set: 'PowerSurge',
      attributes: {
        type: 'Character',
        powerGrid: {
          energy: 4,
          fighting: 5,
          strength: 3,
          intellect: 2
        },
        teamAffiliation: 'X-Men',
        text: 'Leader of the X-Men'
      }
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Cyclops');
    expect(response.body.set).toBe('PowerSurge');
    expect(response.body.game).toBe('overpower');
  });
});

describe('GET /cards', () => {
  // Optional: insert a known card into the test DB before tests run
  beforeAll(async () => {
    await prisma.card.create({
      data: {
        game: 'overpower',
        name: 'Test Cyclops Card',
        set: 'PowerSurge',
        attributes: {
          type: 'Character',
          powerGrid: {
           energy: 4,
           fighting: 5,
           strength: 3,
            intellect: 2
         },
          teamAffiliation: 'X-Men',
          text: 'Leader of the X-Men'
        }
      },
    });
  });

  afterAll(async () => {
    await prisma.card.deleteMany({ where: { name: 'Test Cyclops Card' } });
    await prisma.$disconnect();
  });

  it('should return paginated cards', async () => {
    const res = await request(app).get('/cards?page=1&limit=10');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('cards');
    expect(Array.isArray(res.body.cards)).toBe(true);
    expect(res.body.page).toBe(1);
    expect(res.body.limit).toBe(10);
    expect(res.body).toHaveProperty('total');
    expect(res.body).toHaveProperty('totalPages');
  });

  it('should filter by game', async () => {
    const res = await request(app).get('/cards?game=OverPower');
    expect(res.status).toBe(200);
    expect(res.body.cards.every((card: any) => card.game === 'OverPower')).toBe(true);
  });

  it('should filter by search keyword', async () => {
    const res = await request(app).get('/cards?search=cyclops');
    expect(res.status).toBe(200);
    expect(res.body.cards.length).toBeGreaterThan(0);
    expect(res.body.cards[0].name.toLowerCase()).toContain('cyclops');
  });

  it('should reject invalid query params', async () => {
    const res = await request(app).get('/cards?page=0&limit=9999');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});