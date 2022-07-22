import { Router } from 'express';
import { logout } from './controller';
import { authenticationMiddleware } from 'middlewares';
import { asyncRouteHandler } from 'middlewares';

const router = Router();

router.post('/', authenticationMiddleware, asyncRouteHandler(logout));

export default router;
