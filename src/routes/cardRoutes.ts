import express from 'express';
import { CardModel } from '../models/card';

const router = express.Router();

import { CreateCardSchema } from '../schemas/card.schema';

// Create a new card
router.post('/cards', async (req, res) => {
  const parseResult = CreateCardSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({ error: 'Invalid input', issues: parseResult.error.flatten() });
  }

  try {
    const card = await CardModel.create(parseResult.data);
    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create card', details: err });
  }
});

// Get all cards
router.get('/', async (_req, res) => {
  const cards = await CardModel.findAll();
  res.json(cards);
});

// Get card by ID
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const card = await CardModel.findById(id);
  if (card) res.json(card);
  else res.status(404).json({ error: 'Card not found' });
});

// Delete card by ID
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await CardModel.delete(id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: 'Card not found' });
  }
});

// Update card by ID
router.put('/cards/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const updated = await CardModel.update(id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update card', details: err });
  }
});

export default router;