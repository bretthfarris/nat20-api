import express from 'express';
import { CardModel } from '../models/card';

const router = express.Router();

// Create a new card
router.post('/', async (req, res) => {
  try {
    const card = await CardModel.create(req.body);
    res.status(201).json(card);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
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

export default router;