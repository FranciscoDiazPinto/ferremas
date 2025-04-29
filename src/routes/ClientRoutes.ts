import express from 'express';
import ClientController from '../controllers/ClientController';

const router = express.Router();
const controller = new ClientController();

router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;