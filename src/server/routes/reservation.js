import express from 'express';

import ReservationController from '#src/controllers/reservation.js';
import { asyncHandler } from '../middlewares/utils.js';

const ReservationRouter = express.Router();

ReservationRouter.get(
	'/',
	asyncHandler(async (req, res) => {
		const reservations = await ReservationController.list();
		return res.json(reservations);
	})
);

export default ReservationRouter;
