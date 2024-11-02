import MasterController from './master.js';

import ReservationModel from '#src/models/reservation.js';
import SessionSeatsModel from '#src/models/sessionSeats.js';

import { ResourceNotFound } from '#src/errors/index.js';
import { transactionOptions } from '#src/libs/mongodb/helper.js';

class ReservationController extends MasterController {
	static Model = ReservationModel;

	sessionSeatsModel = new SessionSeatsModel();

	async getById(id, fields) {
		const reservation = await this.model.getById(id, fields);

		if (!reservation) {
			throw new ResourceNotFound('Reservation not found');
		}

		return reservation;
	}

	async reserve({ userId, sessionId, seatsId }) {
		// TODO: chequear que el seatId es de la session
		const seats = seatsId.map(seat => ({
			session_id: sessionId,
			seat_id: seat
		}));

		const session = this.model.startSession();

		try {
			await session.withTransaction(async () => {
				await this.model.insert(
					{
						user_id: userId, // TODO
						is_reserved: true,
						seatsId,
						status: 'reserved',
						confirmed_at: new Date(),
						session_id: sessionId
					},
					session
				);

				await this.sessionSeatsModel.insertMany(seats, session);
			}, transactionOptions);
			return {
				success: true,
				error: null
			};
		} catch (error) {
			return {
				success: false,
				error: error.message
			};
		} finally {
			await session.endSession();
		}
	}
}

export default new ReservationController();
