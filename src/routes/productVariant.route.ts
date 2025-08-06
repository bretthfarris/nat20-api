import { Router } from 'express';
import * as controller from '../controllers/productVariant.controller';

const router = Router();

router.post('/', controller.createProductVariant);
router.patch('/:id', controller.updateProductVariant);
router.get('/product/:productId', controller.getVariantsByProductId);

export default router;