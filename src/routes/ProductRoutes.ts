import express from 'express';
import { ProductController } from '../controllers/ProductController';

const router = express.Router();
const productController = new ProductController();

router.post('/', productController.create);
router.get('/', productController.findAll);
router.get('/:id', productController.findOne);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

export default router;