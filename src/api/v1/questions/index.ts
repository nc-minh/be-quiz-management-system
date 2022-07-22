import { Router } from 'express';
import {
	getQuestions,
	getQuestion,
	createQuestion,
	deleteQuestion,
	updateQuestion,
	getQuantity,
	getQuantityOfQuestions
} from './controller';

const router = Router();

router.get('/', getQuestions);
router.get('/quantity', getQuantity);
router.get('/counter', getQuantityOfQuestions);
router.get('/:id', getQuestion);
router.post('/', createQuestion);
router.delete('/:id', deleteQuestion);
router.put('/:id', updateQuestion);

export default router;
