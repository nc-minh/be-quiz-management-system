import { Router } from 'express';
import { createExam, getExams, getQuantityOfExam, deleteExam, getExam, updateExam } from './controller';

const router = Router();



router.get('/', getExams);
router.get('/counter', getQuantityOfExam);
router.get('/:id', getExam);
router.post('/', createExam);
router.put('/:id', updateExam);
router.delete('/:id', deleteExam);

export default router;
