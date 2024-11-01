import express from 'express';

import SessionController from '#src/controllers/session.js';
import SessionSeatsController from '#src/controllers/sessionSeats.js';

import { asyncHandler } from '../middlewares/utils.js';

const SessionRouter = express.Router();

SessionRouter.get(
	'/',
	asyncHandler(async (req, res) => {
		const sessions = await SessionController.list();
		return res.json(sessions);
	})
);

SessionRouter.get(
	'/seats',
	asyncHandler(async (req, res) => {
		const sessionsSeats = await SessionSeatsController.list();
		return res.json(sessionsSeats);
	})
);

export default SessionRouter;
