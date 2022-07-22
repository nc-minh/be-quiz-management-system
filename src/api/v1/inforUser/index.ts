import { Router } from 'express';
import { inforUser } from './controller';

const router = Router();

router.get('/', inforUser);

export default router;
