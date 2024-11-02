import MasterController from './master.js';
import SessionController from './session.js';
import SeatController from './seat.js';

import ReservationModel from '#src/models/reservation.js';
import SessionSeatsModel from '#src/models/sessionSeats.js';

import { BadRequest, ResourceNotFound } from '#src/errors/index.js';
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
		await this.checkSeatsBelongToHall(sessionId, seatsId);

		const seats = seatsId.map(seat => ({
			session_id: sessionId,
			seat_id: seat
		}));

		const session = this.model.startSession();

		try {
			await session.withTransaction(async () => {
				await this.model.insert(
					{
						user_id: userId,
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

	async checkSeatsBelongToHall(sessionId, seatsId) {
		const { hallId } = await SessionController.getById(sessionId);

		const hallSeats = await SeatController.getByIds(seatsId);

		const hallIdsSet = new Set(hallSeats.map(seat => seat.hallId));

		if (!hallIdsSet.has(hallId) || hallIdsSet.size !== 1) {
			throw new BadRequest('Seats are not from hall');
		}
	}
}

export default new ReservationController();
