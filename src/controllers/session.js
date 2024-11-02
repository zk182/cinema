/* eslint-disable camelcase */
import MasterController from './master.js';
import HallController from './hall.js';

import SessionModel from '#src/models/session.js';
import SessionSeatsModel from '#src/models/sessionSeats.js';

import { ResourceNotFound } from '#src/errors/index.js';

class SessionController extends MasterController {
	static Model = SessionModel;

	sessionSeatsModel = new SessionSeatsModel();

	async getById(id, fields) {
		const session = await this.model.getById(id, fields);

		if (!session) {
			throw new ResourceNotFound('Session not found');
		}

		return session;
	}

	async getSeatStatusBySessionId(sessionId) {
		const session = await this.getById(sessionId, ['hallId']);
		const hallConfig = await HallController.getHallConfigByHallId(
			session.hallId
		); // TODO: cache this
		const reservedSeats =
			await this.sessionSeatsModel.getBySessionId(sessionId);

		return this.generateHallAvailability(hallConfig, reservedSeats);
	}

	generateHallAvailability(hallConfig, reservedSeats) {
		const reservedSeatIds = new Set(reservedSeats.map(seat => seat.seat_id));

		return hallConfig.map(row =>
			row.map(seat => ({
				seat_id: seat.seat_id,
				reserved: reservedSeatIds.has(seat.seat_id)
			}))
		);
	}
}

export default new SessionController();
