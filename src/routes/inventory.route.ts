import { Router } from 'express';
import * as controller from '@controllers/inventory.controller';

const router = Router();

router.post('/', controller.createInventory);
router.get('/:id', controller.getInventoryById);
router.get('/product/:productId', controller.getInventoryForProduct);
router.put('/:id', controller.updateInventory);
router.delete('/:id', controller.deleteInventory);

export default router;