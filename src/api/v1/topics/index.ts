import { Router } from 'express';
import { getTopics, getTopic, createTopic, deleteTopic, updateTopic, countTopics } from './controller';

const router = Router();

router.get('/', getTopics);
router.get('/counter', countTopics);
router.get('/:id', getTopic);
router.post('/', createTopic);
router.delete('/:id', deleteTopic);
router.put('/:id', updateTopic);

export default router;
