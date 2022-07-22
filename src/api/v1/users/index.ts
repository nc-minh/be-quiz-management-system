import { Router } from 'express';
import { addUser, getUsers, getOneUser, deleteUser, updateUser, getQuantityUsers } from './controller';

const router = Router();

router.post('/', addUser);

router.get('/', getUsers);

router.get('/counter', getQuantityUsers);

router.get('/:id', getOneUser);

router.delete('/:id', deleteUser);

router.put('/:id', updateUser);

export default router;
