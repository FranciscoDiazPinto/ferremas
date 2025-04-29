import express from 'express';
import { UserController } from '../controllers/UserController';

const router = express.Router();
const userController = new UserController();

router.post('/', userController.create);
router.get('/', userController.findAll);
router.get('/:id', userController.findOne);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;