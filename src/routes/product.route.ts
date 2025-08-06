import { Router } from 'express';
import * as controller from '../controllers/product.controller';

const router = Router();
router.post('/', controller.createProduct);
// add more as needed (GET, PATCH, etc.)
export default router;