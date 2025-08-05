import { Router } from 'express';
import { CardModel } from '../models/productTypes/card';
import { CreateCardSchema, UpdateCardSchema } from '../schemas/card.schema';
import { createCard, getCards } from '../controllers/cardController';


const router = Router();

// Create a new card
router.post('/', createCard);

// Get all cards
router.get('/', getCards);


// Get a card by ID
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid card ID' });
  }

  try {
    const card = await CardModel.findById(id);
    if (!card) return res.status(404).json({ error: 'Card not found' });

    res.json(card);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch card', details: err });
  }
});

// Update a card by ID
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid card ID' });
  }

  const parseResult = UpdateCardSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      error: 'Invalid update data',
      issues: parseResult.error.flatten(),
    });
  }

  try {
    const updated = await CardModel.update(id, parseResult.data);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update card', details: err });
  }
});

// Delete a card
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid card ID' });
  }

  try {
    const deleted = await CardModel.delete(id);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete card', details: err });
  }
});

export default router;