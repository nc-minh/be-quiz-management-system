import { Router } from 'express';
import { getAnswers, getAnswer, createAnswer, deleteAnswer, updateAnswer } from './controller';

const router = Router();

router.get('/', getAnswers);
router.get('/:id', getAnswer);
router.post('/', createAnswer);
router.delete('/:id', deleteAnswer);
router.put('/:id', updateAnswer);

export default router;
