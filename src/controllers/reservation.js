import MasterController from './master.js';
import ReservationModel from '#src/models/reservation.js';

import { ResourceNotFound } from '#src/errors/index.js';

class ReservationController extends MasterController {
	static Model = ReservationModel;

	async getById(id, fields) {
		const reservation = await this.model.getById(id, fields);

		if (!reservation) {
			throw new ResourceNotFound('Reservation not found');
		}

		return reservation;
	}
}

export default new ReservationController();
