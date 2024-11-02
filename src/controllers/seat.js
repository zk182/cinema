import MasterController from './master.js';
import SeatModel from '#src/models/seat.js';

import { ResourceNotFound } from '#src/errors/index.js';

class SeatController extends MasterController {
	static Model = SeatModel;

	async getById(id, fields) {
		const seat = await this.model.getById(id, fields);

		if (!seat) {
			throw new ResourceNotFound('Seat not found');
		}

		return seat;
	}

	async getByIds(ids, fields) {
		const seats = await this.model.getByIds(ids, fields);

		if (!seats) {
			throw new ResourceNotFound('Seats not found');
		}

		return seats;
	}

	async getSeatsByHallId(hallId) {
		const seats = await this.model.getByHallId(hallId);

		if (!seats) {
			throw new ResourceNotFound('Seats not found');
		}

		return seats;
	}
}

export default new SeatController();
