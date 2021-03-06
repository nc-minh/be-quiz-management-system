import { Router } from 'express';
import v1Routers from './v1';

const router = Router();
import { asyncRouteHandler } from 'middlewares';

router.use('/v1', asyncRouteHandler(v1Routers));

export default router;
