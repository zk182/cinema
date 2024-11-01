import express from 'express';

import AuthRouter from './auth.js';
import HealthRouter from './health.js';
import UserRouter from './user.js';

const router = express.Router();

router.use('/auth', AuthRouter);
router.use('/health', HealthRouter);
router.use('/user', UserRouter);

export default router;
