import { Router } from 'express';
import { getUserExams, getUserExam, startExam, finishExam, getAnsweredQuestions } from './controller';

const router = Router();

router.get('/', getUserExams);
router.get('/answered-questions/:id', getAnsweredQuestions);
router.get('/:id', getUserExam);
router.put('/start/:id', startExam);
router.put('/finish/:id', finishExam);

export default router;
