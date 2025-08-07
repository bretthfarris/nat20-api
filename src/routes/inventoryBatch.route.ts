import { Router } from 'express';
import * as controller from '@controllers/inventoryBatch.controller';

const router = Router();

router.post('/', controller.createInventoryBatch);
router.get('/:id', controller.getInventoryBatchById);
router.get('/product/:productId', controller.getBatchesForProduct);
router.put('/:id', controller.updateInventoryBatch);
router.delete('/:id', controller.deleteInventoryBatch);

export default router;