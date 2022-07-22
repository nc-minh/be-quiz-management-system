import { Router } from 'express';
import loginRouter from './login';
import usersRouter from './users';
import topicsRouter from './topics';
import answersRouter from './answers';
import questionsRouter from './questions';
import examsRouter from './exams';
import userAnswerRouter from './userAnswers';
import userExamRouter from './userExams';
import inforRouter from './inforUser';
import { authenticationMiddleware, adminMiddleware } from 'middlewares';

const router = Router();

router.use('/exams', authenticationMiddleware, adminMiddleware, examsRouter);
router.use('/topics', authenticationMiddleware, adminMiddleware, topicsRouter);
router.use('/answers', authenticationMiddleware, adminMiddleware, answersRouter);
router.use('/users', authenticationMiddleware, adminMiddleware, usersRouter);
router.use('/questions', authenticationMiddleware, adminMiddleware, questionsRouter);
router.use('/user-answers', authenticationMiddleware, userAnswerRouter);
router.use('/user-exams', authenticationMiddleware, userExamRouter);
router.use('/login', loginRouter);
router.use('/infor', authenticationMiddleware, adminMiddleware, inforRouter);

export default router;
