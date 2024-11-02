import express from 'express';

import SessionController from '#src/controllers/session.js';
import ReservationController from '#src/controllers/reservation.js';

import auth from '#src/server/middlewares/auth.js';
import { asyncHandler } from '../middlewares/utils.js';

const SessionRouter = express.Router();

SessionRouter.use(auth());

SessionRouter.get(
	'/',
	asyncHandler(async (req, res) => {
		const sessions = await SessionController.list();
		return res.json(sessions);
	})
);

SessionRouter.get(
	'/:id/seats',
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const status = await SessionController.getStatusBySessionId(Number(id)); // TODO: validate
		return res.json(status);
	})
);

SessionRouter.post(
	'/:id/seats/reserve', // TODO: validate body
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const { seatsId } = req.body;
		const reservation = await ReservationController.reserve({
			userId: req.user.id,
			sessionId: Number(id), // TODO: validate
			seatsId
		});
		return res.json(reservation);
	})
);

export default SessionRouter;
