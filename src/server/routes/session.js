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
	'/:sessionId/seats',
	asyncHandler(async (req, res) => {
		const { sessionId } = req.params;
		const session = await SessionController.getSeatStatusBySessionId(
			Number(sessionId)
		); // TODO: validate
		return res.json(session);
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
