import express from 'express';

import AuthRouter from './auth.js';
import HealthRouter from './health.js';
import UserRouter from './user.js';
import HallRouter from './hall.js';
import SeatRouter from './seat.js';
import SessionRouter from './session.js';
import ReservationRouter from './reservation.js';

const router = express.Router();

router.use('/auth', AuthRouter);
router.use('/health', HealthRouter);
router.use('/users', UserRouter);
router.use('/halls', HallRouter);
router.use('/sessions', SessionRouter);
router.use('/seats', SeatRouter);
router.use('/reservations', ReservationRouter);

export default router;
