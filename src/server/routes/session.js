import express from 'express';

import { exec as execCallback } from 'node:child_process';
import { promisify } from 'node:util';

import path from 'node:path';

import { validate } from 'express-validation';
import SessionController from '#src/controllers/session.js';
import ReservationController from '#src/controllers/reservation.js';

import auth from '#src/server/middlewares/auth.js';
import { asyncHandler } from '../middlewares/utils.js';
import { getStatusValidator, reserveValidator } from '#src/schemas/session.js';

const exec = promisify(execCallback);

const SessionRouter = express.Router();

SessionRouter.use(auth());

SessionRouter.get(
	'/',
	asyncHandler(async (req, res) => {
		const sessions = await SessionController.list();
		return res.json(sessions);
	})
);

SessionRouter.post(
	'/reset',
	asyncHandler(async (req, res) => {
		await exec(`node ${path.resolve(process.cwd(), 'reset-mongo.js')}`);
		return res.json({ success: true });
	})
);

SessionRouter.get(
	'/:id/seats',
	validate(getStatusValidator),
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const status = await SessionController.getStatusBySessionId(Number(id));
		return res.json(status);
	})
);

SessionRouter.post(
	'/:id/seats/reserve',
	validate(reserveValidator),
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const { seatsId } = req.body;
		const reservation = await ReservationController.reserve({
			userId: req.user.id,
			sessionId: Number(id),
			seatsId
		});
		return res.json(reservation);
	})
);

export default SessionRouter;
