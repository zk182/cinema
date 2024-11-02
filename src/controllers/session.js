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

	async getBySessionId(sessionId) {
		const session = await this.getById(sessionId, [
			'hallId',
			'available_seats_count'
		]);

		if (!session) {
			throw new ResourceNotFound('Session not found');
		}

		const hall = await HallController.getById(session.hallId, [
			'seatConfiguration',
			'totalSeats'
		]);

		if (!hall) {
			throw new ResourceNotFound('Hall not found');
		}

		const reservedSeats =
			await this.sessionSeatsModel.getBySessionId(sessionId);

		return this.generateHallAvailability(
			hall.seatConfiguration,
			reservedSeats
		);
	}

	generateHallAvailability(seatConfiguration, reservedSeats) {
		const { rows, seats_per_row } = seatConfiguration;
		const seatingChart = Array.from({ length: rows }, () =>
			new Array(seats_per_row).fill({ reserved: false })
		);

		for (const { row, number, seat_id } of reservedSeats) {
			seatingChart[row - 1][number - 1] = {
				seatId: seat_id,
				reserved: true
			};
		}

		return seatingChart;
	}
}

export default new SessionController();
