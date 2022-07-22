import { Router } from 'express';
import { getUserAnswers, getUserAnswer, createUserAnswer, updateUserAnswer, deleteUserAnswer } from './controller';

const router = Router();

router.get('/', getUserAnswers);
router.post('/get-one', getUserAnswer);
router.post('/', createUserAnswer);
router.delete('/:id', deleteUserAnswer);
router.put('/:id', updateUserAnswer);

export default router;
